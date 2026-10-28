import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import CategoryGrid from '../../Components/CategoryGrid';
import DeliveryHeader from '../../Components/DeliveryHeader';
import DepartmentTabs from '../../Components/DepartmentTabs';
import HomeSearch from '../../Components/HomeSearch';
import FestivalHero, {DiwaliReady} from '../../Components/FestivalHero';
import FestiveSpecials, {SpecialTab} from '../../Components/FestiveSpecials';
import {
  GlassBackground,
  SkyBackground,
} from '../../Components/FestivalDecoration';
import {
  FeaturedBrands,
  PaymentOffers,
  ShoppingStories,
  SnackOffers,
} from '../../Components/HomePromotions';
import ProductRail from '../../Components/ProductRail';
import {
  beautyCategories,
  categoryGroups,
  Department,
  diyaProducts,
  householdCategories,
  karwaProducts,
  lifestyleCategories,
  products,
  ritualProducts,
  selectProducts,
  spotlightCategories,
} from '../../constants/catalog';
import {useShopping} from '../../store/ShoppingContext';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

export default function Home() {
  const {state, dispatch} = useShopping();
  const insets = useSafeAreaInsets();
  const [collapsed, setCollapsed] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
  const [special, setSpecial] = useState<SpecialTab>('Top Picks');
  const ref = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const lastY = useRef(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const diwali = state.department === 'Diwali';
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(collapsed ? 'dark-content' : 'light-content');
    }, [collapsed]),
  );
  const changeDepartment = (department: Department) => {
    dispatch({type: 'department', department});
    ref.current?.scrollTo({y: 0, animated: false});
    setCollapsed(false);
    setBackToTop(false);
    lastY.current = 0;
  };
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    setCollapsed(previous =>
      previous === y > scale(52) ? previous : y > scale(52),
    );
    const show = y > scale(650) && y < lastY.current - 2;
    if (Math.abs(y - lastY.current) > 2) setBackToTop(show);
    lastY.current = y;
  };
  const specials =
    special === 'DIY Mehendi'
      ? karwaProducts.filter(item => item.id === 'mehendi')
      : special === 'Designer Karwa Chauth Sets'
      ? karwaProducts.filter(item => item.category === 'Pooja')
      : karwaProducts;
  return (
    <View style={styles.container}>
      <View style={styles.sky}>
        <SkyBackground diwali={diwali} />
      </View>
      <View style={{height: insets.top}}>
        <Animated.View
          style={[
            styles.statusGlass,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, scale(70)],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <GlassBackground />
        </Animated.View>
      </View>
      <StatusBar barStyle={collapsed ? 'dark-content' : 'light-content'} />
      <Animated.ScrollView
        accessibilityLabel="Home feed"
        ref={ref}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true, listener: onScroll},
        )}
      >
        <DeliveryHeader />
        <View
          style={[
            styles.stickyHeader,
            diwali ? styles.stickyWine : styles.stickyTeal,
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.stickyGlass,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, scale(70)],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <GlassBackground />
          </Animated.View>
          <HomeSearch collapsed={collapsed} diwali={diwali} />
          <DepartmentTabs
            selected={state.department}
            onChange={changeDepartment}
            light={collapsed}
          />
        </View>
        <View style={styles.feed}>
          {(state.department === 'All' || diwali) && (
            <FestivalHero diwali={diwali} />
          )}
          {state.department === 'All' ? (
            <>
              <FestiveSpecials selected={special} onChange={setSpecial} />
              <ProductRail items={specials} category="Karwa Chauth" seeAll />
              <PaymentOffers />
              <FeaturedBrands />
              <DiwaliReady />
              {categoryGroups.map(group => (
                <CategoryGrid
                  key={group.title}
                  title={group.title}
                  items={group.items}
                />
              ))}
              <SnackOffers />
              <CategoryGrid
                title="Stores in spotlight"
                items={spotlightCategories}
                inside
              />
              <CategoryGrid
                title="Picks for your lifestyle"
                items={lifestyleCategories}
                inside
              />
              <ProductRail
                title="A new favourite for her wardrobe"
                sponsored
                items={products.filter(item => item.category === 'Fashion')}
                category="Fashion"
              />
            </>
          ) : diwali ? (
            <>
              <ProductRail
                title="Essentials for your Abhyanga Snan ritual"
                items={ritualProducts}
                category="Beauty"
                seeAll
              />
              <ProductRail
                title="Bring home a little festive glow"
                items={diyaProducts}
                category="Decor"
                seeAll
              />
              <ShoppingStories />
              <ProductRail
                title="Thoughtful Gifts for All"
                items={selectProducts('', 'Gifting')}
                category="Gifting"
                seeAll
              />
              <CategoryGrid
                title="Make every corner festive"
                items={lifestyleCategories.slice(0, 4)}
                inside
              />
            </>
          ) : (
            <>
              <Text style={styles.departmentTitle}>
                {state.department === 'Beauty'
                  ? 'A little care, every day'
                  : state.department === 'Party'
                  ? 'Everything for a great party'
                  : 'Your favourite tech, in minutes'}
              </Text>
              <CategoryGrid
                title={
                  state.department === 'Beauty'
                    ? 'Beauty & Personal Care'
                    : state.department === 'Party'
                    ? 'Get party ready'
                    : 'Electronics & Gadgets'
                }
                items={
                  state.department === 'Beauty'
                    ? beautyCategories
                    : state.department === 'Party'
                    ? spotlightCategories
                    : householdCategories
                }
              />
              <ProductRail
                title="Picked for you"
                items={selectProducts('', state.department)}
                category={state.department}
                seeAll
              />
              <ShoppingStories />
            </>
          )}
          <View style={styles.pageEnd}>
            <Text style={styles.pageEndTitle}>India’s last minute app</Text>
            <Text style={styles.pageEndSubtitle}>
              Everything you need, delivered at your doorstep
            </Text>
            <Text style={styles.pageEndBrand}>
              blink<Text style={styles.pageEndBrandGreen}>it</Text>
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
      {backToTop && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Back to top"
          style={[styles.backToTop, {top: insets.top + scale(126)}]}
          onPress={() => ref.current?.scrollTo({y: 0, animated: true})}
        >
          <GlassBackground />
          <Icon
            name="arrow-up-circle-outline"
            size={scale(18)}
            color="#14241a"
          />
          <Text style={styles.backToTopText}>Back to top</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
