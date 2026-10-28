import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../styles/responsiveSize';
import styles from './styles';
export default function PageHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.pageHeader}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={12}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={scale(23)} color="#202522" />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.pageTitle}>
        {title}
      </Text>
      {right}
    </View>
  );
}
