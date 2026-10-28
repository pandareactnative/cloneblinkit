import {StyleSheet} from 'react-native';
import fontFamily from '../../styles/typography';
import {scale, textScale, width} from '../../styles/responsiveSize';
export default StyleSheet.create({
  toolbar: {
    height: scale(43),
    paddingHorizontal: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(11),
    color: '#7a8278',
  },
  sortButton: {
    flexDirection: 'row',
    gap: scale(5),
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: '#dce4d7',
    borderRadius: scale(8),
    paddingHorizontal: scale(9),
    paddingVertical: scale(5),
  },
  sortText: {
    fontFamily: fontFamily.medium,
    fontSize: textScale(11),
    color: '#29382b',
  },
  list: {
    paddingHorizontal: scale(12),
    paddingTop: scale(5),
    paddingBottom: scale(115),
  },
  row: {gap: scale(13), marginBottom: scale(18)},
  item: {width: (width - scale(24) - scale(26)) / 3},
  emptyText: {textAlign: 'center', lineHeight: scale(18)},
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e7e9e3',
  },
});
