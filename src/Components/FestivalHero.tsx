import React, {useCallback, useId, useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Category,
  diwaliCategories,
  festivalCategories,
  readyCategories,
} from '../constants/catalog';
import imagePath from '../constants/imagePath';
import {RootStackParamList} from '../navigation/types';
import useCarousel from '../hooks/useCarousel';
import {scale, width} from '../styles/responsiveSize';
import {
  DiamondBorder,
  FairyLights,
  Moon,
  ScallopedEdge,
} from './FestivalDecoration';
import GradientBackground from './GradientBackground';
import styles from './styles';

function useShopCategory() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (item: Category) =>
    navigation.navigate('ProductList', {
      title: item.title.replace(/\n/g, ' '),
      category: item.query,
    });
}
export function FestivalTile({
  item,
  large = false,
  cream = false,
}: {
  item: Category;
  large?: boolean;
  cream?: boolean;
}) {
  const shop = useShopCategory();
  const gradientId = useId();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Shop ${item.title.replace(/\n/g, ' ')}`}
      onPress={() => shop(item)}
      style={[
        styles.festivalTile,
        large && styles.festivalTileLarge,
        cream && styles.festivalTileCream,
      ]}
    >
      {large && (
        <Svg
          width={(width - scale(24) - scale(22)) / 3}
          height={scale(127)}
          viewBox="0 0 100 125"
          preserveAspectRatio="none"
          style={styles.absolute}
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#b97845" />
              <Stop offset="1" stopColor="#984b34" />
            </LinearGradient>
          </Defs>
          <Path
            d="M2 19Q2 12 12 9L48 1Q50 0 52 1L88 9Q98 12 98 19V105Q98 114 88 117L51 124Q50 125 49 124L12 117Q2 114 2 105Z"
            fill={cream ? '#ffe9ae' : `url(#${gradientId})`}
            stroke="#d49a47"
            strokeWidth=".75"
          />
        </Svg>
      )}
      <Text
        style={[
          styles.festivalTileTitle,
          large && !cream && styles.festivalTileWhite,
        ]}
      >
        {item.title}
      </Text>
      <Image
        source={item.image}
        style={[
          styles.festivalTilePhoto,
          large && styles.festivalTilePhotoLarge,
        ]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
const offers = [
  {
    title: 'BUY 1 GET 1 FREE',
    subtitle: 'On Lipsticks',
    image: imagePath.lipsticks,
  },
  {
    title: 'BUY 2 GET 1 FREE',
    subtitle: 'On Nail Paints',
    image: imagePath.nailPolish,
  },
  {
    title: 'BUY 1 GET 1 FREE',
    subtitle: 'On Sheet Masks',
    image: imagePath.sheetMask,
  },
];
export function OfferCarousel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const ref = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [page, setPage] = useState(0);
  const cardWidth = width * 0.7;
  const advance = useCallback(
    () =>
      setPage(previous => {
        const next = (previous + 1) % offers.length;
        ref.current?.scrollTo({
          x: next * (cardWidth + scale(10)),
          animated: true,
        });
        return next;
      }),
    [cardWidth],
  );
  const setDragging = useCarousel(offers.length, advance);
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={cardWidth + scale(10)}
      decelerationRate="fast"
      contentContainerStyle={styles.offerCarousel}
      onScrollBeginDrag={() => setDragging(true)}
      onScrollEndDrag={() => setDragging(false)}
      onMomentumScrollEnd={event => {
        setDragging(false);
        setPage(
          Math.round(
            event.nativeEvent.contentOffset.x / (cardWidth + scale(10)),
          ),
        );
      }}
    >
      {offers.map((offer, index) => (
        <TouchableOpacity
          key={offer.title + offer.subtitle}
          accessibilityRole="button"
          accessibilityLabel={offer.title + ' ' + offer.subtitle}
          accessibilityState={{selected: page === index}}
          onPress={() =>
            navigation.navigate('ProductList', {
              title: offer.subtitle.replace('On ', '') + ' offers',
              category: 'Beauty',
            })
          }
          style={[styles.offerCard, {width: cardWidth}]}
        >
          <GradientBackground colors={['#127391', '#083b50']} horizontal />
          <Image source={offer.image} style={styles.offerPhoto} />
          <View style={styles.flex}>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
          </View>
          <Icon name="chevron-right" size={scale(21)} color="#fff" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
export default function FestivalHero({diwali = false}: {diwali?: boolean}) {
  return diwali ? (
    <View style={styles.diwaliHero}>
      <Svg width="100%" height="18" viewBox="0 0 375 28" pointerEvents="none">
        <FairyLights />
      </Svg>
      <Text style={styles.diwaliEyebrow}>GET READY FOR</Text>
      <Text style={styles.diwaliTitle}>Diwali</Text>
      <Text style={styles.diwaliDate}>8ᵀᴴ NOVEMBER, SUNDAY</Text>
      <View style={styles.diwaliTileGrid}>
        {diwaliCategories.map(item => (
          <FestivalTile key={item.id} item={item} large />
        ))}
      </View>
      <DiamondBorder />
    </View>
  ) : (
    <View>
      <View style={styles.karwaHero}>
        <View style={styles.karwaTitleWrap}>
          <Text style={styles.karwaEyebrow}>C E L E B R A T E</Text>
          <Text style={styles.karwaTitle}>Karwa Chauth</Text>
          <View style={styles.moon}>
            <Moon />
          </View>
        </View>
        <View style={styles.festivalTileRow}>
          {festivalCategories.map(item => (
            <FestivalTile key={item.id} item={item} />
          ))}
        </View>
        <OfferCarousel />
      </View>
      <ScallopedEdge />
    </View>
  );
}
export function DiwaliReady() {
  return (
    <View style={styles.diwaliReady}>
      <GradientBackground colors={['#a30057', '#92004c']} />
      <Text style={styles.readyEyebrow}>MAKE YOUR HOME</Text>
      <Text style={styles.readyTitle}>Diwali Ready</Text>
      <View style={styles.readyDate}>
        <Text style={styles.readyDateText}>8TH NOVEMBER, SUNDAY</Text>
      </View>
      <View style={styles.readyGrid}>
        {readyCategories.map(item => (
          <FestivalTile key={item.id} item={item} cream />
        ))}
      </View>
      <Text style={styles.poweredBy}>
        POWERED BY Farmley Happilo Prestige BOROSIL
      </Text>
      <DiamondBorder color="#e79cbe" />
    </View>
  );
}
