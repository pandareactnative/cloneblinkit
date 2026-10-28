import {StyleSheet} from 'react-native';
import fontFamily from '../../styles/typography';
import {scale, textScale} from '../../styles/responsiveSize';
export default StyleSheet.create({
  title: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(23),
    color: '#202522',
    paddingHorizontal: scale(15),
    paddingTop: scale(13),
    paddingBottom: scale(5),
  },
  content: {paddingBottom: scale(150)},
  spacer: {height: scale(20)},
});
