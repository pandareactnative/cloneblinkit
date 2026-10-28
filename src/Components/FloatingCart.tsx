import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getProduct} from '../constants/catalog';
import {itemCount, useShopping} from '../store/ShoppingContext';
import {RootStackParamList} from '../navigation/types';
import {scale} from '../styles/responsiveSize';
import GradientBackground from './GradientBackground';
import styles from './styles';

export default function FloatingCart({
  aboveTabs = true,
}: {
  aboveTabs?: boolean;
}) {
  const {state} = useShopping();
  const count = itemCount(state.cart);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottom = aboveTabs
    ? Math.max(insets.bottom - scale(12), scale(6)) + scale(74)
    : insets.bottom + scale(15);
  if (!count) return null;
  const photos = state.cart
    .slice(-2)
    .reverse()
    .map(item => getProduct(item.productId))
    .filter(Boolean);
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`View cart, ${count} ${
        count === 1 ? 'item' : 'items'
      }`}
      style={[
        styles.floatingCart,
        {bottom},
      ]}
      onPress={() => navigation.navigate('Cart')}
    >
      <GradientBackground colors={['#83b763eb', '#408715f5']} horizontal />
      <View style={styles.cartThumbs}>
        {photos.map((product, index) => (
          <View
            key={product!.id + index}
            style={[styles.cartThumb, index > 0 && styles.cartThumbOverlap]}
          >
            <Image
              source={product!.image}
              style={styles.cartThumbImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
      <View style={styles.cartWords}>
        <Text style={styles.cartTitle}>View cart</Text>
        <Text style={styles.cartCount}>
          {count} {count === 1 ? 'Item' : 'Items'}
        </Text>
      </View>
      <View style={styles.cartArrow}>
        <Icon name="chevron-right" size={scale(25)} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}
