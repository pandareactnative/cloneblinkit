import {StyleSheet} from 'react-native';
import fontFamily from '../../styles/typography';
import {scale, textScale} from '../../styles/responsiveSize';
export default StyleSheet.create({
  content: {padding: scale(24), paddingTop: scale(35)},
  eyebrow: {
    fontFamily: fontFamily.bold,
    fontSize: textScale(10),
    letterSpacing: 2,
    color: '#608943',
  },
  title: {
    fontFamily: fontFamily.heavy,
    fontSize: textScale(32),
    lineHeight: scale(38),
    color: '#1d2c1c',
    marginTop: scale(12),
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(14),
    lineHeight: scale(21),
    color: '#6d7768',
    marginTop: scale(10),
  },
  paper: {
    height: scale(205),
    width: scale(165),
    alignSelf: 'center',
    backgroundColor: '#f1f5e9',
    borderRadius: scale(20),
    marginVertical: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(14),
  },
  paperText: {
    fontFamily: fontFamily.bold,
    color: '#6b7c5e',
    fontSize: textScale(11),
  },
  toggleRow: {flexDirection: 'row', gap: scale(10), marginBottom: scale(20)},
  toggle: {
    flex: 1,
    padding: scale(12),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#e4e9df',
    alignItems: 'center',
  },
  active: {borderColor: '#31850e', backgroundColor: '#f0f9eb'},
});
