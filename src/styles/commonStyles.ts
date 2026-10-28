import {StyleSheet} from 'react-native';
import colors from './blinkitColors';
import fontFamily from './typography';
import {scale, textScale} from './responsiveSize';
export default StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  flex: {flex: 1},
  row: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(19),
    color: colors.ink,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    color: colors.ink,
  },
  muted: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(12),
    color: colors.muted,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: scale(10),
    paddingVertical: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(14),
    color: colors.white,
  },
  empty: {alignItems: 'center', padding: scale(32), gap: scale(12)},
});
