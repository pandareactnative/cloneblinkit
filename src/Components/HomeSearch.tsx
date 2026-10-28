import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useShopping} from '../store/ShoppingContext';
import {scale} from '../styles/responsiveSize';
import AppIcon from './AppIcon';
import styles from './styles';

const suggestions = [
  '"pooja thali"',
  '"magazine"',
  '"plants"',
  '"birthday gift"',
  '"home decor"',
];
export default function HomeSearch({
  collapsed = false,
  diwali = false,
  plain = false,
}: {
  collapsed?: boolean;
  diwali?: boolean;
  plain?: boolean;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {dispatch} = useShopping();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (collapsed || plain) return;
    const timer = setInterval(
      () => setIndex(value => (value + 1) % suggestions.length),
      2800,
    );
    return () => clearInterval(timer);
  }, [collapsed, plain]);
  return (
    <View style={styles.searchRow}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Search products"
        onPress={() => navigation.navigate('Search')}
        style={[
          styles.searchButton,
          !collapsed &&
            !plain &&
            (diwali ? styles.searchRose : styles.searchTeal),
        ]}
      >
        <Icon name="magnify" color="#0a1511" size={scale(25)} />
        <Text style={styles.searchText} numberOfLines={1}>
          {collapsed || plain
            ? 'Search for atta, dal, coke and more'
            : `Search ${suggestions[index]}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Voice search"
        onPress={() => dispatch({type: 'panel', panel: 'voice'})}
        style={[
          styles.voiceButton,
          !collapsed &&
            !plain &&
            (diwali ? styles.voiceRose : styles.voiceTeal),
        ]}
      >
        <AppIcon name="sound" selected size={scale(24)} />
      </TouchableOpacity>
    </View>
  );
}
