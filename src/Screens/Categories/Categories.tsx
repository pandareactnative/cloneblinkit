import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import HomeSearch from '../../Components/HomeSearch';
import CategoryGrid from '../../Components/CategoryGrid';
import {
  categoryGroups,
  lifestyleCategories,
  spotlightCategories,
} from '../../constants/catalog';
import styles from './styles';
export default function Categories() {
  return (
    <WrapperContainer>
      <Text style={styles.title}>Shop by category</Text>
      <HomeSearch plain />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {categoryGroups.map(group => (
          <CategoryGrid
            key={group.title}
            title={group.title}
            items={group.items}
          />
        ))}
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
        <View style={styles.spacer} />
      </ScrollView>
    </WrapperContainer>
  );
}
