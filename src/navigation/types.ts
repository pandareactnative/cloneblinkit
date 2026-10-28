import {NavigatorScreenParams} from '@react-navigation/native';
export type BottomTabParamList = {
  Home: undefined;
  OrderAgain: undefined;
  Categories: undefined;
  Print: undefined;
};
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  ProductList: {title: string; category?: string; saved?: boolean};
  ProductDetail: {productId: string};
  Search: undefined;
  Cart: undefined;
};
