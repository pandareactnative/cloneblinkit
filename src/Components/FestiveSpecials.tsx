import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import imagePath from '../constants/imagePath';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

export type SpecialTab =
  | 'Top Picks'
  | 'DIY Mehendi'
  | 'Designer Karwa Chauth Sets';
const tabs: SpecialTab[] = [
  'Top Picks',
  'DIY Mehendi',
  'Designer Karwa Chauth Sets',
];
export default function FestiveSpecials({
  selected,
  onChange,
}: {
  selected: SpecialTab;
  onChange: (value: SpecialTab) => void;
}) {
  return (
    <View style={styles.specials}>
      <Text style={styles.specialsTitle}>﹒◇ FESTIVE SPECIALS ◇﹒</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specialsTabs}
      >
        {tabs.map((label, index) => {
          const active = selected === label;
          return (
            <TouchableOpacity
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{selected: active}}
              key={label}
              style={[styles.specialTab, index === 2 && styles.specialTabLong]}
              onPress={() => onChange(label)}
            >
              <Svg
                width={scale(index === 2 ? 181 : 143)}
                height={scale(65)}
                viewBox="0 0 144 65"
                preserveAspectRatio="none"
                style={styles.absolute}
                pointerEvents="none"
              >
                <Path
                  d="M0 64Q7 64 10 48L15 18Q18 2 33 2H113Q130 2 133 18L138 49Q141 64 144 64Z"
                  fill={active ? '#fff' : '#fcf6e4'}
                  stroke={active ? '#ccae48' : '#e8d9ae'}
                  strokeWidth={active ? '1' : '.5'}
                />
              </Svg>
              <View style={styles.specialTabImage}>
                {index === 0 ? (
                  <Icon name="medal" color="#dc591d" size={scale(30)} />
                ) : (
                  <Image
                    source={
                      index === 1 ? imagePath.mehendi : imagePath.karwaSet
                    }
                    style={styles.specialTabPhoto}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text
                style={[
                  styles.specialTabText,
                  active && styles.specialTabActive,
                ]}
              >
                {label === 'DIY Mehendi'
                  ? 'DIY\nMehendi'
                  : label === 'Designer Karwa Chauth Sets'
                  ? 'Designer Karwa\nChauth Sets'
                  : label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
