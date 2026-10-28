import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import imagePath from '../constants/imagePath';
import {useShopping} from '../store/ShoppingContext';
import {scale} from '../styles/responsiveSize';
import GradientBackground from './GradientBackground';
import styles from './styles';

export function PaymentOffers() {
  const {dispatch} = useShopping();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="View payment offers"
      style={styles.paymentOffers}
      onPress={() => dispatch({type: 'panel', panel: 'payments'})}
    >
      <Text style={styles.paymentEyebrow}>EXCLUSIVE PAYMENT OFFERS</Text>
      <Text style={styles.axisBank}>AXIS BANK</Text>
      <Text style={styles.visa}>VISA</Text>
      <Icon name="chevron-right" size={scale(19)} color="#333" />
    </TouchableOpacity>
  );
}
const featured = [
  {
    label: 'Festive Finds',
    title: 'Phool\nGift Boxes',
    image: imagePath.phoolGifts,
    colors: ['#b92737', '#d55336'],
    border: '#2876ed',
  },
  {
    label: 'NEWLY',
    title: 'LAUNCHED',
    image: imagePath.bananaChips,
    colors: ['#f36918', '#ffe48a'],
    border: '#cba343',
  },
  {
    label: 'Featured',
    title: 'NUTRAJ',
    image: imagePath.nutrajGifts,
    colors: ['#a5000a', '#d81115'],
    border: '#2876ed',
  },
];
export function FeaturedBrands() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.featuredSection}>
      <Text style={styles.sectionTitle}>Featured this week</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredRow}
      >
        {featured.map(item => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Shop ${item.title.replace(/\n/g, ' ')}`}
            key={item.title}
            style={[styles.featuredFrame, {borderColor: item.border}]}
            onPress={() =>
              navigation.navigate('ProductList', {
                title: item.title.replace(/\n/g, ' '),
                category: 'Gifting',
              })
            }
          >
            <View style={styles.featuredCard}>
              <GradientBackground colors={item.colors} />
              <View style={styles.featuredLabel}>
                <Text style={styles.featuredLabelText}>{item.label}</Text>
              </View>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Image
                source={item.image}
                style={styles.featuredPhoto}
                resizeMode="cover"
              />
              {item.label === 'NEWLY' && (
                <Text style={styles.forYou}>✦ For You ✦</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
export function ShoppingStories() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cards = [
    {
      title: 'Festive Ready',
      description: 'Beauty, style & more',
      image: imagePath.festiveBeauty,
      category: 'Beauty',
    },
    {
      title: 'Light Up Your Home',
      description: 'Diyas, urlis & more',
      image: imagePath.festiveShopping,
      category: 'Decor',
    },
    {
      title: 'Home Makeover',
      description: 'A festive look for every room',
      image: imagePath.homeMakeover,
      category: 'Home',
    },
  ];
  return (
    <View style={styles.shoppingStories}>
      <Text style={styles.storiesEyebrow}>TIME FOR YOUR</Text>
      <Text style={styles.storiesTitle}>Festive Shopping</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesRow}
        snapToInterval={scale(224)}
        decelerationRate="fast"
      >
        {cards.map(item => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Shop ${item.title}`}
            key={item.title}
            style={styles.storyCard}
            onPress={() =>
              navigation.navigate('ProductList', {
                title: item.title,
                category: item.category,
              })
            }
          >
            <View style={styles.storyFrame}>
              <Image source={item.image} style={styles.storyPhoto} />
            </View>
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Text style={styles.storyDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
export function SnackOffers() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.snackOffers}
    >
      {[
        {
          title: 'Buy your favourite\ncrunchy snacks',
          image: imagePath.lays,
          color: '#350400',
        },
        {
          title: 'A little sweetness\nfor every celebration',
          image: imagePath.chocolateHampers,
          color: '#b78b29',
        },
      ].map(item => (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={item.title.replace(/\n/g, ' ')}
          key={item.title}
          style={[styles.snackOffer, {backgroundColor: item.color}]}
          onPress={() =>
            navigation.navigate('ProductList', {
              title: 'Snacks & treats',
              category: 'Party',
            })
          }
        >
          <Text style={styles.snackOfferTitle}>{item.title}</Text>
          <Image
            source={item.image}
            style={styles.snackOfferPhoto}
            resizeMode="contain"
          />
          <View style={styles.shopNow}>
            <Text style={styles.shopNowText}>Shop now</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
