import React, {useCallback, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import DeliveryHeader from '../../Components/DeliveryHeader';
import HomeSearch from '../../Components/HomeSearch';
import GroceryIllustration from '../../Components/GroceryIllustration';
import ProductCard from '../../Components/ProductCard';
import {GlassBackground} from '../../Components/FestivalDecoration';
import GradientBackground from '../../Components/GradientBackground';
import {bestsellerProducts} from '../../constants/catalog';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

export default function OrderAgain() {
  const insets = useSafeAreaInsets();
  const [scrolled, setScrolled] = useState(false);
  useFocusEffect(useCallback(() => StatusBar.setBarStyle('dark-content'), []));
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
    setScrolled(event.nativeEvent.contentOffset.y > scale(80));
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusArea,
          {height: insets.top},
          scrolled && styles.statusScrolled,
        ]}
      />
      <StatusBar barStyle="dark-content" />
      <ScrollView
        accessibilityLabel="Order again feed"
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={onScroll}
        contentContainerStyle={styles.content}
      >
        <View>
          <View style={styles.alwaysBanner}>
            <Text style={styles.alwaysText}>
              We are here to deliver all your needs 24/7
            </Text>
          </View>
          <View style={styles.deliveryNight}>
            <GradientBackground colors={['#575b5d', '#838783', '#b0b2ac']} />
            <DeliveryHeader />
          </View>
        </View>
        <View style={styles.stickySearch}>
          <GlassBackground />
          <HomeSearch plain />
        </View>
        <View style={styles.reorder}>
          <View style={styles.illustration}>
            <GroceryIllustration />
          </View>
          <Text style={styles.reorderTitle}>Reordering will be easy</Text>
          <Text style={styles.reorderText}>
            Items you order will show up here so you can buy them again easily
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Bestsellers</Text>
        <View style={styles.grid}>
          {bestsellerProducts.map(item => (
            <View key={item.id} style={styles.cell}>
              <ProductCard item={item} wide />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
