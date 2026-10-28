import {StyleSheet} from 'react-native';
import fontFamily from '../../styles/typography';
import {scale, textScale, width} from '../../styles/responsiveSize';
export default StyleSheet.create({
  statusArea: {backgroundColor: '#fff2e3'},
  statusScrolled: {backgroundColor: '#fffdf7'},
  container: {flex: 1, backgroundColor: '#fff'},
  content: {paddingBottom: scale(155)},
  alwaysBanner: {
    height: scale(42),
    backgroundColor: '#fff2e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alwaysText: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(12),
    color: '#856013',
  },
  deliveryNight: {paddingVertical: scale(10)},
  stickySearch: {backgroundColor: '#fffcf4', zIndex: 2},
  reorder: {
    backgroundColor: '#faf8ef',
    paddingHorizontal: scale(29),
    paddingBottom: scale(30),
    alignItems: 'center',
  },
  illustration: {width: scale(270), height: scale(185), marginTop: scale(9)},
  reorderTitle: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(19),
    color: '#0b0d0b',
    marginTop: scale(8),
  },
  reorderText: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    lineHeight: scale(18),
    color: '#1f241f',
    textAlign: 'center',
    marginTop: scale(8),
  },
  sectionTitle: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(19),
    color: '#353a35',
    margin: scale(15),
    marginTop: scale(27),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(12),
    gap: scale(13),
    rowGap: scale(23),
  },
  cell: {width: (width - scale(24) - scale(26)) / 3},
});
