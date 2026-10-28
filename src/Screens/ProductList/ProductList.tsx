import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {selectProducts} from '../../constants/catalog';
import {useShopping} from '../../store/ShoppingContext';
import WrapperContainer from '../../Components/WrapperContainer';
import PageHeader from '../../Components/PageHeader';
import ProductCard from '../../Components/ProductCard';
import FloatingCart from '../../Components/FloatingCart';
import BottomSheet from '../../Components/BottomSheet';
import {scale} from '../../styles/responsiveSize';
import commonStyles from '../../styles/commonStyles';
import styles from './styles';

const sortOptions = ['Recommended', 'Price: low to high', 'Price: high to low'];
export default function ProductList({
  route,
}: NativeStackScreenProps<RootStackParamList, 'ProductList'>) {
  const {state} = useShopping();
  const [sort, setSort] = useState('Recommended');
  const [sheet, setSheet] = useState(false);
  const data = selectProducts(
    '',
    route.params.category,
    route.params.saved ? state.saved : undefined,
  );
  if (sort !== 'Recommended')
    data.sort((a, b) =>
      sort === 'Price: low to high' ? a.price - b.price : b.price - a.price,
    );
  return (
    <WrapperContainer>
      <PageHeader title={route.params.title} />
      <View style={styles.toolbar}>
        <Text style={styles.count}>{data.length} products</Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sort products"
          style={styles.sortButton}
          onPress={() => setSheet(true)}
        >
          <Icon name="sort-variant" size={scale(16)} color="#29382b" />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <View style={styles.item}>
            <ProductCard item={item} wide />
          </View>
        )}
        ListEmptyComponent={
          <View style={commonStyles.empty}>
            <Icon
              name={route.params.saved ? 'heart-outline' : 'basket-outline'}
              color="#759665"
              size={scale(55)}
            />
            <Text style={commonStyles.title}>
              {route.params.saved
                ? 'Keep your favourites close'
                : 'More good things are on the way'}
            </Text>
            <Text style={[commonStyles.muted, styles.emptyText]}>
              {route.params.saved
                ? 'Tap the heart on a product to save it here.'
                : 'There are no products in this category yet. Explore another aisle for now.'}
            </Text>
          </View>
        }
      />
      <FloatingCart aboveTabs={false} />
      <BottomSheet
        visible={sheet}
        title="Sort products"
        onClose={() => setSheet(false)}
      >
        {sortOptions.map(option => (
          <TouchableOpacity
            accessibilityRole="radio"
            accessibilityState={{checked: sort === option}}
            accessibilityLabel={option}
            key={option}
            style={styles.sortOption}
            onPress={() => {
              setSort(option);
              setSheet(false);
            }}
          >
            <Text style={commonStyles.text}>{option}</Text>
            <Icon
              name={sort === option ? 'radiobox-marked' : 'radiobox-blank'}
              color="#31850e"
              size={scale(20)}
            />
          </TouchableOpacity>
        ))}
      </BottomSheet>
    </WrapperContainer>
  );
}
