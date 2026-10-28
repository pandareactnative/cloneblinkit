import {StyleSheet} from 'react-native';
import colors from '../../styles/blinkitColors';
import fontFamily from '../../styles/typography';
import {scale, textScale} from '../../styles/responsiveSize';
export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  sky: {position: 'absolute', left: 0, right: 0, top: 0, height: scale(600)},
  statusGlass: {...StyleSheet.absoluteFill},
  stickyHeader: {
    zIndex: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ffffff40',
  },
  stickyWine: {backgroundColor: '#83002f'},
  stickyTeal: {backgroundColor: '#08475e'},
  stickyGlass: {...StyleSheet.absoluteFill},
  scrollContent: {paddingBottom: scale(140)},
  feed: {backgroundColor: '#fff'},
  departmentTitle: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(27),
    color: colors.ink,
    padding: scale(22),
  },
  backToTop: {
    position: 'absolute',
    alignSelf: 'center',
    height: scale(33),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(7),
    borderRadius: scale(19),
    paddingHorizontal: scale(12),
    overflow: 'hidden',
    borderWidth: 0.6,
    borderColor: '#c9cec3',
    zIndex: 8,
  },
  backToTopText: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(12),
    color: '#152119',
  },
  pageEnd: {
    paddingTop: scale(35),
    paddingHorizontal: scale(22),
    paddingBottom: scale(20),
    gap: scale(12),
  },
  pageEndTitle: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(33),
    lineHeight: scale(40),
    color: '#c3c8c5',
  },
  pageEndSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    color: '#8a938c',
  },
  pageEndBrand: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(30),
    color: '#bac1ba',
  },
  pageEndBrandGreen: {color: '#92b49a'},
});
