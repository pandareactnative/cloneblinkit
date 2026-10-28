import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useShopping} from '../store/ShoppingContext';
import {scale} from '../styles/responsiveSize';
import AppIcon from './AppIcon';
import styles from './styles';

export default function DeliveryHeader({light = false}: {light?: boolean}) {
  const {state, dispatch} = useShopping();
  const color = light ? '#202522' : '#fff';
  return (
    <View style={styles.deliveryHeader}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Choose delivery location"
        onPress={() => dispatch({type: 'panel', panel: 'address'})}
        style={styles.deliveryAddress}
      >
        <Text style={[styles.deliveryEyebrow, {color}]}>Blinkit in</Text>
        <View style={styles.deliveryTimeRow}>
          <Text style={[styles.deliveryTime, {color}]}>8 minutes</Text>
          <View style={styles.alwaysOpen}>
            <Icon name="clock-fast" size={scale(11)} color="#fff" />
            <Text style={styles.alwaysOpenText}>24/7</Text>
          </View>
        </View>
        <View style={styles.addressRow}>
          <Text numberOfLines={1} style={[styles.deliveryLocation, {color}]}>
            {state.address}
          </Text>
          <Icon name="menu-down" color={color} size={scale(17)} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Open wallet"
        style={styles.walletButton}
        onPress={() => dispatch({type: 'panel', panel: 'wallet'})}
      >
        <View style={styles.walletIcon}>
          <AppIcon name="wallet" size={scale(20)} color="#e6cd37" selected />
        </View>
        <View style={styles.walletAmount}>
          <Text style={styles.walletAmountText}>₹0</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        style={styles.profileButton}
        onPress={() => dispatch({type: 'panel', panel: 'profile'})}
      >
        <Icon name="account" size={scale(28)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
