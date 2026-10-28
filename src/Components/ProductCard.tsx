import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Product} from '../constants/catalog';
import {RootStackParamList} from '../navigation/types';
import {useShopping} from '../store/ShoppingContext';
import {formatPrice} from '../utils/format';
import {scale} from '../styles/responsiveSize';
import colors from '../styles/blinkitColors';
import QuantityButton from './QuantityButton';
import styles from './styles';

export default function ProductCard({
  item,
  wide = false,
}: {
  item: Product;
  wide?: boolean;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {state, dispatch} = useShopping();
  const saved = state.saved.includes(item.id);
  const [detailView, setDetailView] = useState(0);
  const open = () => navigation.navigate('ProductDetail', {productId: item.id});
  return (
    <View style={[styles.product, wide && styles.productWide]}>
      <View style={styles.productVisual}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`View ${item.name}`}
          style={styles.productPhotoButton}
          onPress={open}
        >
          <Image
            source={item.image}
            style={[
              styles.productPhoto,
              {transform: [{scale: 1 + detailView * 0.12}]},
            ]}
            resizeMode={item.id === 'oreo' ? 'contain' : 'cover'}
          />
        </TouchableOpacity>
        <View style={styles.photoDots}>
          {[0, 1, 2, 3].map(index => (
            <TouchableOpacity
              key={index}
              accessibilityRole="radio"
              accessibilityLabel={`Detail view ${index + 1} of ${item.name}`}
              accessibilityState={{checked: detailView === index}}
              style={styles.photoDotButton}
              onPress={() => setDetailView(index)}
            >
              <View
                style={[
                  styles.photoDot,
                  detailView === index && styles.photoDotActive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        {item.badge && (
          <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>{item.badge}</Text>
          </View>
        )}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${item.name}`}
          accessibilityState={{selected: saved}}
          style={styles.favourite}
          onPress={() => dispatch({type: 'save', productId: item.id})}
        >
          <Icon
            name={saved ? 'heart' : 'heart-outline'}
            color={saved ? '#e44a66' : '#a7acaf'}
            size={scale(18)}
          />
        </TouchableOpacity>
        {item.vegetarian && (
          <View style={styles.vegMark}>
            <View style={styles.vegDot} />
          </View>
        )}
        <View style={styles.productUnitRow}>
          <Text style={styles.productUnit}>{item.unit}</Text>
          <QuantityButton product={item} />
        </View>
      </View>
      <TouchableOpacity onPress={open} style={styles.productInfo}>
        <View style={styles.productPrices}>
          <Text
            style={[
              styles.productPrice,
              item.offer === 'Price Drop' && styles.dropPrice,
            ]}
          >
            {formatPrice(item.price)}
          </Text>
          {item.mrp > item.price && (
            <Text style={styles.productMrp}>{formatPrice(item.mrp)}</Text>
          )}
        </View>
        {item.offer && <Text style={styles.productOffer}>{item.offer}</Text>}
        <Text style={styles.productName} numberOfLines={4}>
          {item.name}
        </Text>
        {item.details && (
          <View style={styles.productTags}>
            {item.details.map(tag => (
              <View key={tag} style={styles.productTag}>
                <Text style={styles.productTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        {item.rating && (
          <View style={styles.rating}>
            <Text style={styles.stars}>★★★★◐</Text>
            <Text style={styles.ratingCount}>{item.rating}</Text>
          </View>
        )}
        <View style={styles.productEta}>
          <Icon name="clock-outline" size={scale(12)} color={colors.muted} />
          <Text style={styles.productEtaText}>{item.minutes || 8} mins</Text>
        </View>
      </TouchableOpacity>
      {item.related && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`${item.related} for ${item.name}`}
          style={styles.related}
          onPress={() =>
            navigation.navigate('ProductList', {
              title: item.related!,
              category: item.category,
            })
          }
        >
          <Text style={styles.relatedText} numberOfLines={1}>
            {item.related}
          </Text>
          <Icon name="menu-right" size={scale(13)} color="#42554b" />
        </TouchableOpacity>
      )}
    </View>
  );
}
