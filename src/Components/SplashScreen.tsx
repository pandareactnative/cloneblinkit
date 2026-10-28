import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MyntraLogo from './MyntraLogo';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {scale, textScale} from '../styles/responsiveSize';

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      testID="myntra-splash"
      accessibilityLabel="Myntra is starting"
      style={styles.container}
    >
      <View style={styles.brand}>
        <MyntraLogo size={scale(78)} />
        <Text style={styles.name}>Myntra</Text>
      </View>
      <Text style={[styles.tagline, {bottom: insets.bottom + scale(8)}]}>
        EVERYTHING YOU NEED TO LOOK GOOD
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {alignItems: 'center', gap: scale(9)},
  name: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(25),
    color: colors.textPrimary,
  },
  tagline: {
    position: 'absolute',
    fontFamily: fontFamily.regular,
    fontSize: textScale(8),
    letterSpacing: 2.2,
    color: '#a2a3ac',
    textAlign: 'center',
  },
});
