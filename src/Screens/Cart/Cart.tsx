import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getProduct} from '../../constants/catalog';
import {cartTotal, itemCount, useShopping} from '../../store/ShoppingContext';
import WrapperContainer from '../../Components/WrapperContainer';
import PageHeader from '../../Components/PageHeader';
import QuantityButton from '../../Components/QuantityButton';
import {formatPrice} from '../../utils/format';
import commonStyles from '../../styles/commonStyles';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

export default function Cart() {
  const {state} = useShopping();
  const insets = useSafeAreaInsets();
  const count = itemCount(state.cart);
  const total = cartTotal(state.cart);
  const mrp = state.cart.reduce(
    (sum, item) =>
      sum +
      Math.max(
        getProduct(item.productId)?.mrp || item.unitPrice,
        item.unitPrice,
      ) *
        item.quantity,
    0,
  );
  return (
    <WrapperContainer>
      <PageHeader title={`My cart (${count})`} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {!count ? (
          <View style={commonStyles.empty}>
            <Icon name="basket-outline" size={scale(70)} color="#6d9255" />
            <Text style={commonStyles.title}>Your cart is waiting</Text>
            <Text style={commonStyles.muted}>
              Add your everyday favourites to get started.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.delivery}>
              <Icon name="moped-outline" size={scale(27)} color="#31850e" />
              <View>
                <Text style={styles.deliveryTitle}>Delivery in 8 minutes</Text>
                <Text style={styles.deliverySubtitle}>
                  {count} {count === 1 ? 'item' : 'items'} in your cart
                </Text>
              </View>
            </View>
            <View style={styles.items}>
              {state.cart.map(item => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <View
                    key={`${item.productId}-${item.option}`}
                    style={styles.item}
                  >
                    <Image
                      source={product.image}
                      style={styles.photo}
                      resizeMode="contain"
                    />
                    <View style={styles.itemWords}>
                      <Text style={styles.name}>{product.name}</Text>
                      <Text style={styles.unit}>{item.option}</Text>
                      <Text style={styles.itemPrice}>
                        {formatPrice(item.unitPrice)}
                      </Text>
                    </View>
                    <View style={styles.quantity}>
                      <QuantityButton product={product} option={item.option} />
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.summary}>
              <Text style={styles.heading}>Bill details</Text>
              <View style={styles.summaryRow}>
                <Text style={commonStyles.text}>Items total</Text>
                <Text style={commonStyles.text}>{formatPrice(mrp)}</Text>
              </View>
              {mrp > total && (
                <View style={styles.summaryRow}>
                  <Text style={commonStyles.text}>Your savings</Text>
                  <Text style={styles.savings}>
                    − {formatPrice(mrp - total)}
                  </Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={commonStyles.text}>Delivery charge</Text>
                <Text style={styles.savings}>FREE</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.heading}>Grand total</Text>
                <Text style={styles.heading}>{formatPrice(total)}</Text>
              </View>
            </View>
            <View style={styles.addressCard}>
              <Icon
                name="map-marker-outline"
                size={scale(22)}
                color="#31850e"
              />
              <View>
                <Text style={styles.addressTitle}>Delivering to</Text>
                <Text style={styles.unit}>{state.address}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {!!count && (
        <View
          style={[
            styles.footer,
            {paddingBottom: Math.max(insets.bottom, scale(12))},
          ]}
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Proceed with cart"
            style={styles.proceed}
            onPress={() =>
              Alert.alert(
                'Your cart is ready',
                'This UI study does not place orders or collect payments.',
              )
            }
          >
            <View>
              <Text style={styles.total}>{formatPrice(total)}</Text>
              <Text style={styles.totalCaption}>TOTAL</Text>
            </View>
            <Text style={styles.proceedText}>Proceed</Text>
            <Icon name="chevron-right" size={scale(24)} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </WrapperContainer>
  );
}
