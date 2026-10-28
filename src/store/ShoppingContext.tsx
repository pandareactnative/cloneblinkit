import React, {createContext, useCallback, useContext, useReducer} from 'react';
import {Department, getProduct} from '../constants/catalog';

export type CartItem = {
  productId: string;
  quantity: number;
  option: string;
  unitPrice: number;
};
type PendingItem = {productId: string; option?: string};
export type Panel =
  | 'location'
  | 'address'
  | 'profile'
  | 'wallet'
  | 'payments'
  | 'voice'
  | 'zomato'
  | null;
export type ShoppingState = {
  cart: CartItem[];
  saved: string[];
  address: string;
  confirmedLocation: boolean;
  pending: PendingItem | null;
  optionsProductId: string | null;
  panel: Panel;
  department: Department;
};
export type ShoppingAction =
  | {type: 'add'; productId: string; option?: string}
  | {type: 'change'; productId: string; option?: string; delta: number}
  | {type: 'save'; productId: string}
  | {type: 'pending'; item: PendingItem}
  | {type: 'confirmLocation'; address?: string}
  | {type: 'panel'; panel: Panel}
  | {type: 'options'; productId: string | null}
  | {type: 'department'; department: Department};
export const initialState: ShoppingState = {
  cart: [{productId: 'oreo', quantity: 1, option: '120 g', unitPrice: 30}],
  saved: [],
  address: 'Mumbai Central, Mumbai',
  confirmedLocation: false,
  pending: null,
  optionsProductId: null,
  panel: null,
  department: 'All',
};
function addItem(cart: CartItem[], id: string, option?: string) {
  const product = getProduct(id);
  if (!product) return cart;
  const variant = product.options?.find(item => item.label === option);
  const unit = variant?.label || product.unit;
  const existing = cart.some(
    item => item.productId === id && item.option === unit,
  );
  return existing
    ? cart.map(item =>
        item.productId === id && item.option === unit
          ? {...item, quantity: item.quantity + 1}
          : item,
      )
    : [
        ...cart,
        {
          productId: id,
          quantity: 1,
          option: unit,
          unitPrice: variant?.price ?? product.price,
        },
      ];
}
export function shoppingReducer(
  state: ShoppingState,
  action: ShoppingAction,
): ShoppingState {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        cart: addItem(state.cart, action.productId, action.option),
        optionsProductId: null,
      };
    case 'change': {
      const index = state.cart.findIndex(
        item =>
          item.productId === action.productId &&
          (!action.option || item.option === action.option),
      );
      if (index < 0) return state;
      return {
        ...state,
        cart: state.cart
          .map((item, i) =>
            i === index
              ? {...item, quantity: Math.max(0, item.quantity + action.delta)}
              : item,
          )
          .filter(item => item.quantity > 0),
      };
    }
    case 'save':
      return {
        ...state,
        saved: state.saved.includes(action.productId)
          ? state.saved.filter(id => id !== action.productId)
          : [...state.saved, action.productId],
      };
    case 'pending':
      return {
        ...state,
        pending: action.item,
        optionsProductId: null,
        panel: 'location',
      };
    case 'confirmLocation':
      return {
        ...state,
        confirmedLocation: true,
        address: action.address || state.address,
        cart: state.pending
          ? addItem(state.cart, state.pending.productId, state.pending.option)
          : state.cart,
        pending: null,
        panel: null,
      };
    case 'panel':
      return {
        ...state,
        panel: action.panel,
        ...(action.panel === null ? {pending: null} : {}),
      };
    case 'options':
      return {...state, optionsProductId: action.productId};
    case 'department':
      return {...state, department: action.department};
  }
}
const ShoppingContext = createContext<{
  state: ShoppingState;
  dispatch: React.Dispatch<ShoppingAction>;
  addProduct: (id: string, option?: string) => void;
} | null>(null);
export function ShoppingProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);
  const addProduct = useCallback(
    (id: string, option?: string) => {
      const product = getProduct(id);
      if (!product) return;
      if (product.options && !option)
        dispatch({type: 'options', productId: id});
      else if (!state.confirmedLocation)
        dispatch({type: 'pending', item: {productId: id, option}});
      else dispatch({type: 'add', productId: id, option});
    },
    [state.confirmedLocation],
  );
  return (
    <ShoppingContext.Provider value={{state, dispatch, addProduct}}>
      {children}
    </ShoppingContext.Provider>
  );
}
export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) throw new Error('ShoppingProvider is missing');
  return context;
}
export const itemCount = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);
export const cartTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
export const productQuantity = (cart: CartItem[], id: string) =>
  cart
    .filter(item => item.productId === id)
    .reduce((sum, item) => sum + item.quantity, 0);
