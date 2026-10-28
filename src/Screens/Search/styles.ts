import {StyleSheet} from 'react-native';
import fontFamily from '../../styles/typography';
import {scale, textScale} from '../../styles/responsiveSize';
export default StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(47),
    margin: scale(12),
    paddingHorizontal: scale(12),
    borderRadius: scale(13),
    gap: scale(7),
    borderWidth: 0.8,
    borderColor: '#cfdaca',
    backgroundColor: '#fcfff9',
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    color: '#202522',
    paddingVertical: 0,
  },
  trending: {padding: scale(18)},
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(15),
    color: '#343c32',
    marginBottom: scale(15),
  },
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: scale(9)},
  chip: {
    borderWidth: 0.7,
    borderColor: '#dce5d6',
    borderRadius: scale(20),
    paddingHorizontal: scale(13),
    paddingVertical: scale(9),
  },
  chipText: {
    fontFamily: fontFamily.medium,
    fontSize: textScale(12),
    color: '#43553a',
  },
});
