import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Category} from '../constants/catalog';
import {RootStackParamList} from '../navigation/types';
import styles from './styles';

export function CategoryTile({
  item,
  inside = false,
}: {
  item: Category;
  inside?: boolean;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Browse ${item.title.replace(/\n/g, ' ')}`}
      style={styles.categoryCell}
      onPress={() =>
        navigation.navigate('ProductList', {
          title: item.title.replace(/\n/g, ' '),
          category: item.query,
        })
      }
    >
      <View
        style={[
          inside ? styles.storeTile : styles.categoryPhotoWrap,
          {backgroundColor: item.color || '#e5f3f3'},
        ]}
      >
        {inside && <Text style={styles.storeTitle}>{item.title}</Text>}
        <Image
          source={item.image}
          style={inside ? styles.storePhoto : styles.categoryPhoto}
          resizeMode="cover"
        />
      </View>
      {!inside && <Text style={styles.categoryLabel}>{item.title}</Text>}
    </TouchableOpacity>
  );
}
export default function CategoryGrid({
  title,
  items,
  inside = false,
}: {
  title: string;
  items: Category[];
  inside?: boolean;
}) {
  return (
    <View style={styles.categorySection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.categoryGrid}>
        {items.map(item => (
          <CategoryTile key={item.id} item={item} inside={inside} />
        ))}
      </View>
    </View>
  );
}
