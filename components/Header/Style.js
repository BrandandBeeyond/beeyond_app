import getFontFamily from '../../assets/fonts/helper';
import {scaleFontSize, verticalScale} from '../../assets/styles/Scaling';
const {StyleSheet} = require('react-native');

export const HeaderStyle = StyleSheet.create({
  title1: {
    fontSize: scaleFontSize(21),
    lineHeight: scaleFontSize(30),
    fontFamily: getFontFamily('Roboto', 600),
    textTransform: 'capitalize',
  },
  title2: {
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(22),
    fontFamily: getFontFamily('Roboto', 600),
    textTransform: 'capitalize',
  },
  title3: {
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontFamily: getFontFamily('Roboto', 600),
    letterSpacing: 0.5,
    textTransform: 'capitalize',
    paddingVertical: verticalScale(8),
  },
  title4: {
    fontSize: scaleFontSize(9),
    lineHeight: scaleFontSize(12),
    fontFamily: getFontFamily('Roboto', 600),
    letterSpacing: 0.5,
    textTransform: 'capitalize',
    paddingVertical: verticalScale(8),
  },
});
