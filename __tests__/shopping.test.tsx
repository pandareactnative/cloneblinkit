import React from 'react';
import ReactTestRenderer, {act} from 'react-test-renderer';
import {Modal, TextInput, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Home from '../src/Screens/Home/Home';
import Search from '../src/Screens/Search/Search';
import ShoppingSheets from '../src/Components/ShoppingSheets';
import ProductCard from '../src/Components/ProductCard';
import {getProduct, selectProducts} from '../src/constants/catalog';
import {
  ShoppingProvider,
  useShopping,
  itemCount,
  cartTotal,
  initialState,
  shoppingReducer,
} from '../src/store/ShoppingContext';
import {RootStackParamList} from '../src/navigation/types';

let app: ReactTestRenderer.ReactTestRenderer;
let latest: ReturnType<typeof useShopping>;
function Probe() {
  latest = useShopping();
  return null;
}
async function render(children: React.ReactNode) {
  await act(() => {
    app = ReactTestRenderer.create(
      <ShoppingProvider>
        {children}
        <ShoppingSheets />
        <Probe />
      </ShoppingProvider>,
    );
  });
}
function button(label: string) {
  const item = app.root
    .findAllByType(TouchableOpacity)
    .find(node => node.props.accessibilityLabel === label);
  if (!item) throw new Error(`Missing button: ${label}`);
  return item;
}
async function press(label: string) {
  await act(() => button(label).props.onPress());
}
beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});
afterEach(async () => {
  if (app) await act(() => app.unmount());
  jest.useRealTimers();
});

test('changing departments replaces the home feed and festive selections', async () => {
  await render(<Home />);
  expect(button('Shop Sargi & Pooja Needs')).toBeDefined();
  await press('Department Diwali');
  expect(latest.state.department).toBe('Diwali');
  expect(button('Shop Lights, Diya & Decor')).toBeDefined();
  expect(button('View Moti Chandan Luxury Soap')).toBeDefined();
  await press('Department Beauty');
  expect(button('Browse Skin & Face')).toBeDefined();
  await press('Department All');
  await press('DIY Mehendi');
  expect(
    app.root
      .findAllByType(ProductCard)
      .some(node => node.props.item.id === 'karwa-set'),
  ).toBe(false);
  expect(button('View Neha Gold Mehendi Cone')).toBeDefined();
});
test('the first add waits for location confirmation, then updates cart totals', async () => {
  await render(<ProductCard item={getProduct('karwa-set')!} />);
  await press('Add Happy Karwa Chauth Set MyRoyals');
  expect(itemCount(latest.state.cart)).toBe(1);
  expect(latest.state.panel).toBe('location');
  await press('Confirm delivery location');
  expect(itemCount(latest.state.cart)).toBe(2);
  expect(cartTotal(latest.state.cart)).toBe(379);
  expect(latest.state.panel).toBeNull();
  await press('Increase Happy Karwa Chauth Set MyRoyals');
  expect(cartTotal(latest.state.cart)).toBe(728);
  await press('Decrease Happy Karwa Chauth Set MyRoyals');
  await press('Decrease Happy Karwa Chauth Set MyRoyals');
  expect(latest.state.cart.some(item => item.productId === 'karwa-set')).toBe(
    false,
  );
});
test('product options keep the selected variant and its price through confirmation', async () => {
  await render(<ProductCard item={getProduct('mehendi')!} />);
  await press('Add Neha Gold Mehendi Cone');
  expect(latest.state.optionsProductId).toBe('mehendi');
  await press('Add Neha Gold Mehendi Cone 50 g');
  expect(latest.state.pending?.option).toBe('50 g');
  await press('Confirm delivery location');
  expect(latest.state.cart.find(item => item.productId === 'mehendi')).toEqual({
    productId: 'mehendi',
    option: '50 g',
    quantity: 1,
    unitPrice: 28,
  });
  expect(
    app.root.findAllByType(Modal).filter(node => node.props.visible),
  ).toHaveLength(0);
});
test('closing location confirmation cancels an add', async () => {
  await render(<ProductCard item={getProduct('karwa-set')!} />);
  await press('Add Happy Karwa Chauth Set MyRoyals');
  const modal = app.root.findAllByType(Modal).find(node => node.props.visible)!;
  await act(() => modal.props.onRequestClose());
  expect(latest.state.pending).toBeNull();
  expect(itemCount(latest.state.cart)).toBe(1);
});
test('delivery changes validate before confirming a pending item', async () => {
  await render(<ProductCard item={getProduct('karwa-set')!} />);
  await press('Add Happy Karwa Chauth Set MyRoyals');
  await press('Choose a different location');
  await press('Save delivery address');
  expect(latest.state.address).toBe('Mumbai Central, Mumbai');
  await act(() =>
    app.root.findByType(TextInput).props.onChangeText('Bandra, Mumbai'),
  );
  await press('Save delivery address');
  expect(latest.state.address).toBe('Bandra, Mumbai');
  expect(itemCount(latest.state.cart)).toBe(2);
});
test('search filters actual cards and recovers from an empty result', async () => {
  await render(<Search />);
  const input = app.root.findByType(TextInput);
  await act(() => input.props.onChangeText('milk'));
  expect(
    app.root.findAllByType(ProductCard).map(node => node.props.item.id),
  ).toEqual(['milk']);
  await act(() => input.props.onChangeText('no-such-product'));
  expect(app.root.findAllByType(ProductCard)).toHaveLength(0);
  await press('Clear search');
  expect(button('Search Diwali')).toBeDefined();
});
test('saved items are shared and product cards navigate to real detail routes', async () => {
  await render(<ProductCard item={getProduct('milk')!} />);
  await press('Save Gokul Full Cream Milk');
  expect(
    selectProducts('', '', latest.state.saved).map(item => item.id),
  ).toEqual(['milk']);
  await press('View Gokul Full Cream Milk');
  const navigation = useNavigation() as unknown as NativeStackScreenProps<
    RootStackParamList,
    'ProductDetail'
  >['navigation'];
  expect(navigation.navigate).toHaveBeenCalledWith('ProductDetail', {
    productId: 'milk',
  });
  await press('Unsave Gokul Full Cream Milk');
  expect(latest.state.saved).toHaveLength(0);
});
test('cart variants update independently and an unknown product is ignored', () => {
  const confirmed = {...initialState, cart: [], confirmedLocation: true};
  const first = shoppingReducer(confirmed, {
    type: 'add',
    productId: 'mehendi',
    option: '25 g',
  });
  const second = shoppingReducer(first, {
    type: 'add',
    productId: 'mehendi',
    option: '50 g',
  });
  const changed = shoppingReducer(second, {
    type: 'change',
    productId: 'mehendi',
    option: '25 g',
    delta: -1,
  });
  expect(changed.cart.map(item => item.option)).toEqual(['50 g']);
  expect(cartTotal(changed.cart)).toBe(28);
  expect(first.cart).toHaveLength(1);
  expect(
    shoppingReducer(changed, {type: 'add', productId: 'missing'}).cart,
  ).toEqual(changed.cart);
});
