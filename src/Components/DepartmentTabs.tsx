import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Department, departments} from '../constants/catalog';
import {scale} from '../styles/responsiveSize';
import AppIcon from './AppIcon';
import styles from './styles';

const icons = ['bag', 'diya', 'party', 'headphones', 'beauty'] as const;
export default function DepartmentTabs({
  selected,
  onChange,
  light = false,
}: {
  selected: Department;
  onChange: (value: Department) => void;
  light?: boolean;
}) {
  const color = light ? '#303834' : '#fff';
  return (
    <View style={styles.departments}>
      {departments.map((item, index) => {
        const active = selected === item;
        return (
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityLabel={`Department ${item}`}
            accessibilityState={{selected: active}}
            key={item}
            style={styles.department}
            onPress={() => onChange(item)}
          >
            <AppIcon
              name={icons[index]}
              color={color}
              size={scale(23)}
              selected={active}
            />
            {item === 'Diwali' && selected !== 'Diwali' && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>New</Text>
              </View>
            )}
            <Text
              style={[
                styles.departmentText,
                {color},
                active && styles.departmentSelected,
              ]}
            >
              {item}
            </Text>
            {active && (
              <View style={[styles.departmentLine, {backgroundColor: color}]} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
