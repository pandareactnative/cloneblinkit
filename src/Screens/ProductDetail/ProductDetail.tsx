import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getProduct, selectProducts} from '../../constants/catalog';
import {RootStackParamList} from '../../navigation/types';
import {useShopping} from '../../store/ShoppingContext';
import {formatPrice} from '../../utils/format';
import WrapperContainer from '../../Components/WrapperContainer';
import PageHeader from '../../Components/PageHeader';
import ProductRail from '../../Components/ProductRail';
import QuantityButton from '../../Components/QuantityButton';
import commonStyles from '../../styles/commonStyles';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

export default function ProductDetail({
  route,
}: NativeStackScreenProps<RootStackParamList, 'ProductDetail'>) {
  const product = getProduct(route.params.productId);
  const {state, dispatch} = useShopping();
  const insets = useSafeAreaInsets();
  if (!product)
    return (
      <WrapperContainer>
        <PageHeader title="Product unavailable" />
      </WrapperContainer>
    );
  const saved = state.saved.includes(product.id);
  return (
    <WrapperContainer>
      <PageHeader
        title={product.category}
        right={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${product.name}`}
            onPress={() => dispatch({type: 'save', productId: product.id})}
          >
            <Icon
              name={saved ? 'heart' : 'heart-outline'}
              size={scale(23)}
              color={saved ? '#d64661' : '#4b5f45'}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <View style={styles.eta}>
            <Icon name="clock-outline" size={scale(13)} color="#44543d" />
            <Text style={styles.etaText}>{product.minutes || 8} MINS</Text>
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.unit}>{product.unit}</Text>
          <View style={styles.prices}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.mrp > product.price && (
              <>
                <Text style={styles.mrp}>{formatPrice(product.mrp)}</Text>
                <Text style={styles.offer}>
                  {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                </Text>
              </>
            )}
          </View>
          <Text style={styles.tax}>Inclusive of all taxes</Text>
          <View style={styles.delivery}>
            <Icon name="map-marker-outline" size={scale(20)} color="#31850e" />
            <View>
              <Text style={commonStyles.text}>Delivering to</Text>
              <Text style={styles.address}>{state.address}</Text>
            </View>
          </View>
          <Text style={styles.subheading}>Product details</Text>
          <Text style={styles.description}>
            {product.details?.join(' · ') || product.unit}
            {'\n'}A little everyday convenience, just a few minutes away.
          </Text>
        </View>
        <ProductRail
          title="You might also like"
          items={selectProducts('', product.category)
            .filter(item => item.id !== product.id)
            .slice(0, 4)}
        />
      </ScrollView>
      <View
        style={[
          styles.footer,
          {paddingBottom: Math.max(insets.bottom, scale(13))},
        ]}
      >
        <View>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.tax}>{product.unit}</Text>
        </View>
        <View style={styles.addWrap}>
          <QuantityButton product={product} />
        </View>
      </View>
    </WrapperContainer>
  );
}
