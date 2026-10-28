import {Platform} from 'react-native';

export default {
  regular: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
  medium: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  bold: Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'sans-serif-medium',
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
};
