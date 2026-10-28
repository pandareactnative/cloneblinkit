import React from 'react';
import navigationStrings from './navigationStrings';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home, OrderAgain, Categories, Print} from '../Screens';
import {BottomTabParamList} from './types';
import CustomBottomTabBar from './CustomBottomTabBar';
const Tab = createBottomTabNavigator<BottomTabParamList>();
const renderTabs = (props: BottomTabBarProps) => (
  <CustomBottomTabBar {...props} />
);
export default function TabRoutes() {
  return (
    <Tab.Navigator
      tabBar={renderTabs}
      screenOptions={{
        headerShown: false,
        sceneStyle: {backgroundColor: '#fff'},
      }}
    >
      <Tab.Screen name={navigationStrings.HOME} component={Home} />
      <Tab.Screen name={navigationStrings.ORDER_AGAIN} component={OrderAgain} />
      <Tab.Screen name={navigationStrings.CATEGORIES} component={Categories} />
      <Tab.Screen name={navigationStrings.PRINT} component={Print} />
    </Tab.Navigator>
  );
}
