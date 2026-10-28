import {StyleSheet} from 'react-native';
import fontFamily from '../../styles/typography';
import {scale, textScale} from '../../styles/responsiveSize';
export default StyleSheet.create({
  content: {paddingBottom: scale(20)},
  image: {width: '100%', height: scale(265), backgroundColor: '#f7f8f9'},
  details: {padding: scale(17)},
  eta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginBottom: scale(10),
  },
  etaText: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(9),
    color: '#44543d',
  },
  name: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(23),
    lineHeight: scale(29),
    color: '#202522',
  },
  unit: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    color: '#777f75',
    marginTop: scale(8),
  },
  prices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginTop: scale(13),
  },
  price: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(21),
    color: '#202522',
  },
  mrp: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    textDecorationLine: 'line-through',
    color: '#7c8479',
  },
  offer: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(12),
    color: '#2773e6',
  },
  tax: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(10),
    color: '#7a8475',
    marginTop: scale(3),
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingVertical: scale(17),
    marginVertical: scale(13),
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: '#e6ebe2',
  },
  address: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(13),
    color: '#263723',
    marginTop: scale(3),
  },
  subheading: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(17),
    color: '#202522',
    marginBottom: scale(10),
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    lineHeight: scale(20),
    color: '#78816f',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    paddingTop: scale(12),
    borderTopWidth: 0.8,
    borderTopColor: '#e4e9e0',
    backgroundColor: '#fff',
  },
  addWrap: {height: scale(38), width: scale(62)},
});
