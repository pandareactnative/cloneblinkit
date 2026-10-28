import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useShopping} from '../store/ShoppingContext';
import {scale} from '../styles/responsiveSize';
import AppIcon from '../Components/AppIcon';
import FloatingCart from '../Components/FloatingCart';
import {GlassBackground} from '../Components/FestivalDecoration';
import styles from '../Components/styles';

const icons = ['home', 'bag', 'grid', 'printer'] as const;
const labels = ['Home', 'Order Again', 'Categories', 'Print'];
export default function CustomBottomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom - scale(12), scale(6));
  const {dispatch} = useShopping();
  return (
    <View
      style={[styles.bottomOverlay, {height: insets.bottom + scale(150)}]}
      pointerEvents="box-none"
    >
      <FloatingCart />
      <View style={[styles.bottomNavRow, {bottom}]}>
        <View style={styles.bottomNav}>
          <GlassBackground />
          {state.routes.map((route, index) => {
            const selected = index === state.index;
            return (
              <TouchableOpacity
                accessibilityRole="tab"
                accessibilityLabel={labels[index]}
                accessibilityState={{selected}}
                key={route.key}
                style={[styles.bottomTab, selected && styles.bottomTabSelected]}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!event.defaultPrevented) navigation.navigate(route.name);
                }}
              >
                <AppIcon
                  name={icons[index]}
                  size={scale(22)}
                  selected={selected}
                />
                <Text
                  style={[
                    styles.bottomTabText,
                    selected && styles.bottomTabTextSelected,
                  ]}
                >
                  {labels[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Open Zomato"
          style={styles.zomatoButton}
          onPress={() => dispatch({type: 'panel', panel: 'zomato'})}
        >
          <GlassBackground />
          <View style={styles.zomatoWordmark}>
            <Text style={styles.zomatoText}>zomato</Text>
            <Icon name="arrow-top-right" size={scale(10)} color="#080a08" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
