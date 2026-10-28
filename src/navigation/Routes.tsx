import React from 'react';
import navigationStrings from './navigationStrings';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, ProductDetail, ProductList, Search} from '../Screens';
import {ShoppingProvider} from '../store/ShoppingContext';
import ShoppingSheets from '../Components/ShoppingSheets';
import {RootStackParamList} from './types';
import TabRoutes from './TabRoutes';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Routes() {
  return (
    <ShoppingProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: '#fff'},
          }}
        >
          <Stack.Screen name={navigationStrings.TABS} component={TabRoutes} />
          <Stack.Screen
            name={navigationStrings.PRODUCT_LIST}
            component={ProductList}
          />
          <Stack.Screen
            name={navigationStrings.PRODUCT_DETAIL}
            component={ProductDetail}
          />
          <Stack.Screen name={navigationStrings.SEARCH} component={Search} />
          <Stack.Screen name={navigationStrings.CART} component={Cart} />
        </Stack.Navigator>
        <ShoppingSheets />
      </NavigationContainer>
    </ShoppingProvider>
  );
}
