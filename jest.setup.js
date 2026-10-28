/* eslint-env jest */
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    SafeAreaProvider: ({children}) => children,
    SafeAreaView: props => React.createElement(View, props),
    useSafeAreaInsets: () => ({top: 62, bottom: 34, left: 0, right: 0}),
  };
});
jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Path: 'Path',
  G: 'G',
  Text: 'SvgText',
  TSpan: 'TSpan',
  Ellipse: 'Ellipse',
  Rect: 'Rect',
  Circle: 'Circle',
  Polygon: 'Polygon',
  Line: 'Line',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  RadialGradient: 'RadialGradient',
  Stop: 'Stop',
}));
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    emit: jest.fn(() => ({defaultPrevented: false})),
  };
  return {
    useNavigation: jest.fn(() => navigation),
    useIsFocused: () => true,
    useFocusEffect: callback => React.useEffect(callback, [callback]),
  };
});
