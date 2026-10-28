import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const scale = (size: number) => (width / 375) * size;
export const verticalScale = (size: number) => (height / 812) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateScaleVertical = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;
export const textScale = (size: number) => moderateScale(size, 0.3);
