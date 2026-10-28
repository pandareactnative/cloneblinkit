import React, {useDeferredValue, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {selectProducts} from '../../constants/catalog';
import WrapperContainer from '../../Components/WrapperContainer';
import PageHeader from '../../Components/PageHeader';
import ProductCard from '../../Components/ProductCard';
import FloatingCart from '../../Components/FloatingCart';
import {scale} from '../../styles/responsiveSize';
import commonStyles from '../../styles/commonStyles';
import listStyles from '../ProductList/styles';
import styles from './styles';

const trending = [
  'Karwa Chauth',
  'Diwali',
  'Mehendi',
  'Milk',
  'Chips',
  'Chocolate',
  'Diyas',
];
export default function Search() {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const data = selectProducts(deferred);
  return (
    <WrapperContainer>
      <PageHeader title="Search" />
      <View style={styles.search}>
        <Icon name="magnify" color="#435542" size={scale(24)} />
        <TextInput
          accessibilityLabel="Search for products"
          placeholder="Search for atta, dal, coke and more"
          value={query}
          onChangeText={setQuery}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
          style={styles.input}
        />
        {!!query && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setQuery('')}
          >
            <Icon name="close" size={scale(18)} color="#647260" />
          </TouchableOpacity>
        )}
      </View>
      {!query.trim() ? (
        <View style={styles.trending}>
          <Text style={styles.heading}>Try searching for</Text>
          <View style={styles.chips}>
            {trending.map(label => (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Search ${label}`}
                key={label}
                style={styles.chip}
                onPress={() => {
                  setQuery(label);
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.chipText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          data={data}
          numColumns={3}
          keyExtractor={item => item.id}
          contentContainerStyle={listStyles.list}
          columnWrapperStyle={listStyles.row}
          renderItem={({item}) => (
            <View style={listStyles.item}>
              <ProductCard item={item} wide />
            </View>
          )}
          ListEmptyComponent={
            <View style={commonStyles.empty}>
              <Text style={commonStyles.title}>No matches for “{query}”</Text>
              <Text style={commonStyles.muted}>
                Try another product or category.
              </Text>
            </View>
          }
        />
      )}
      <FloatingCart aboveTabs={false} />
    </WrapperContainer>
  );
}
