import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Product} from '../constants/catalog';
import {RootStackParamList} from '../navigation/types';
import {scale} from '../styles/responsiveSize';
import ProductCard from './ProductCard';
import styles from './styles';

export default function ProductRail({
  title,
  items,
  category,
  seeAll = false,
  sponsored = false,
}: {
  title?: string;
  items: Product[];
  category?: string;
  seeAll?: boolean;
  sponsored?: boolean;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.rail}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      {sponsored && <Text style={styles.sponsored}>Sponsored</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productRail}
      >
        {items.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </ScrollView>
      {seeAll && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`See all ${
            category || title || 'festive'
          } products`}
          style={styles.seeAll}
          onPress={() =>
            navigation.navigate('ProductList', {
              title: title || 'Festive specials',
              category,
            })
          }
        >
          <View style={styles.seeAllImages}>
            {items.slice(0, 3).map((item, index) => (
              <Image
                key={item.id}
                source={item.image}
                style={[
                  styles.seeAllImage,
                  index > 0 && styles.seeAllImageOverlap,
                ]}
              />
            ))}
          </View>
          <Text style={styles.seeAllText}>See all products</Text>
          <Icon name="menu-right" color="#465183" size={scale(20)} />
        </TouchableOpacity>
      )}
    </View>
  );
}
