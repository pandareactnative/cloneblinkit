import React, {useState} from 'react';
import {
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getProduct} from '../constants/catalog';
import {RootStackParamList} from '../navigation/types';
import {useShopping} from '../store/ShoppingContext';
import {formatPrice} from '../utils/format';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/blinkitColors';
import {scale} from '../styles/responsiveSize';
import BottomSheet from './BottomSheet';
import GroceryIllustration from './GroceryIllustration';
import QuantityButton from './QuantityButton';
import styles from './styles';

export default function ShoppingSheets() {
  const {state, dispatch} = useShopping();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const product = state.optionsProductId
    ? getProduct(state.optionsProductId)
    : undefined;
  const close = () => dispatch({type: 'panel', panel: null});
  const title =
    state.panel === 'address'
      ? 'Delivery location'
      : state.panel === 'profile'
      ? 'Your account'
      : state.panel === 'wallet'
      ? 'Blinkit money'
      : state.panel === 'payments'
      ? 'Payment offers'
      : state.panel === 'voice'
      ? 'What are you looking for?'
      : 'Explore Zomato';
  const openSearch = () => {
    close();
    navigation.navigate('Search');
  };
  return (
    <BottomSheet
      visible={!!product || !!state.panel}
      title={
        state.panel === 'location'
          ? 'Confirm delivery location'
          : product?.name || title
      }
      hideHeader={state.panel === 'location'}
      onClose={() => {
        dispatch({type: 'options', productId: null});
        close();
      }}
    >
      {state.panel === 'location' && (
        <View style={styles.locationSheet}>
          <View style={styles.locationArt}>
            <GroceryIllustration location />
          </View>
          <Text style={styles.locationQuestion}>
            Are you ordering for the selected location?
          </Text>
          <View style={styles.locationCard}>
            <View style={styles.locationAddress}>
              <Icon name="map-marker" size={scale(28)} color="#d0a81d" />
              <View>
                <Text style={styles.locationName}>
                  {state.address.split(',')[0]}
                </Text>
                <Text style={styles.locationCity}>
                  {state.address.split(',').slice(1).join(',').trim() ||
                    'Delivery location'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Confirm delivery location"
              style={commonStyles.button}
              onPress={() => dispatch({type: 'confirmLocation'})}
            >
              <Text style={commonStyles.buttonText}>
                Yes continue with this location
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Choose a different location"
            style={styles.differentLocation}
            onPress={() => dispatch({type: 'panel', panel: 'address'})}
          >
            <Text style={styles.differentLocationText}>
              No, want a different location
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {product?.options?.map(option => (
        <View key={option.label} style={styles.optionsRow}>
          <Image
            source={product.image}
            style={styles.optionsPhoto}
            resizeMode="contain"
          />
          <View style={commonStyles.flex}>
            <Text style={styles.optionsName}>{option.label}</Text>
            <Text style={styles.optionsPrice}>{formatPrice(option.price)}</Text>
          </View>
          <View style={styles.optionsAddWrap}>
            <QuantityButton product={product} option={option.label} />
          </View>
        </View>
      ))}
      {state.panel === 'address' && (
        <>
          <Text style={styles.sheetText}>
            Choose where you would like your delivery.
          </Text>
          <TextInput
            accessibilityLabel="Delivery address"
            value={address}
            onChangeText={value => {
              setAddress(value);
              setError(false);
            }}
            placeholder="Area, city"
            style={styles.field}
          />
          {error && (
            <Text style={styles.error}>
              Enter an area and city to continue.
            </Text>
          )}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Save delivery address"
            style={commonStyles.button}
            onPress={() => {
              if (address.trim().length < 5) {
                setError(true);
                return;
              }
              dispatch({type: 'confirmLocation', address: address.trim()});
              setAddress('');
            }}
          >
            <Text style={commonStyles.buttonText}>Save location</Text>
          </TouchableOpacity>
        </>
      )}
      {state.panel === 'profile' && (
        <>
          {[
            {
              label: 'Saved items',
              icon: 'heart-outline',
              onPress: () => {
                close();
                navigation.navigate('ProductList', {
                  title: 'Your saved items',
                  saved: true,
                });
              },
            },
            {
              label: 'Delivery location',
              icon: 'map-marker-outline',
              onPress: () => dispatch({type: 'panel', panel: 'address'}),
            },
            {
              label: 'Your cart',
              icon: 'shopping-outline',
              onPress: () => {
                close();
                navigation.navigate('Cart');
              },
            },
            {
              label: 'Blinkit money',
              icon: 'wallet-outline',
              onPress: () => dispatch({type: 'panel', panel: 'wallet'}),
            },
          ].map(item => (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={item.label}
              key={item.label}
              style={styles.accountRow}
              onPress={item.onPress}
            >
              <Icon name={item.icon} size={scale(22)} color={colors.ink} />
              <Text style={styles.accountRowText}>{item.label}</Text>
              <Icon
                name="chevron-right"
                size={scale(18)}
                color={colors.muted}
              />
            </TouchableOpacity>
          ))}
        </>
      )}
      {state.panel === 'wallet' && (
        <View style={commonStyles.empty}>
          <Icon name="wallet-giftcard" size={scale(55)} color={colors.green} />
          <Text style={commonStyles.title}>₹0</Text>
          <Text style={styles.sheetText}>Your Blinkit money balance</Text>
        </View>
      )}
      {state.panel === 'payments' && (
        <>
          <Text style={commonStyles.title}>
            More savings on every celebration
          </Text>
          <Text style={styles.sheetText}>
            Explore bank and card offers at checkout. Availability and
            eligibility depend on your card.
          </Text>
          <View style={styles.accountRow}>
            <Text style={styles.axisBank}>AXIS BANK</Text>
            <Text style={styles.visa}>VISA</Text>
            <Text style={commonStyles.text}>ICICI Bank</Text>
          </View>
        </>
      )}
      {state.panel === 'voice' && (
        <>
          <View style={commonStyles.empty}>
            <Icon
              name="microphone-outline"
              size={scale(43)}
              color={colors.green}
            />
            <Text style={styles.sheetText}>
              Find groceries, festive essentials and everyday favourites.
            </Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Type your search"
            style={commonStyles.button}
            onPress={openSearch}
          >
            <Text style={commonStyles.buttonText}>Type your search</Text>
          </TouchableOpacity>
        </>
      )}
      {state.panel === 'zomato' && (
        <>
          <Text style={commonStyles.title}>
            Something delicious is a tap away
          </Text>
          <Text style={styles.sheetText}>
            Explore restaurants and food delivery on Zomato.
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Visit Zomato"
            style={[commonStyles.button, {marginTop: scale(16)}]}
            onPress={() => {
              close();
              Linking.openURL('https://www.zomato.com/').catch(() => undefined);
            }}
          >
            <Text style={commonStyles.buttonText}>Open Zomato ↗</Text>
          </TouchableOpacity>
        </>
      )}
    </BottomSheet>
  );
}
