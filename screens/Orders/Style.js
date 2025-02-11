import {StyleSheet} from 'react-native';
import { horizontalScale, scaleFontSize } from '../../assets/styles/Scaling';
import { verticalScale } from 'react-native-size-matters';
import getFontFamily from '../../assets/fonts/helper';

export const OrderStyle = StyleSheet.create({
  userNoLoggedIn: {
    backgroundColor: '#fff',
    padding: horizontalScale(15),
    borderWidth: horizontalScale(0.5),
    borderColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: horizontalScale(10),
    borderRadius: horizontalScale(20),
  },
  mainBtn: {
    width: '100%',
    padding: horizontalScale(10),
    backgroundColor: '#f9b000',
    marginVertical: verticalScale(20),
    borderRadius: horizontalScale(10),
    alignItems: 'center',
  },
  mainBtnText: {
    color: '#fff',
    fontSize: scaleFontSize(13),
    lineHeight: verticalScale(16),
    textTransform: 'uppercase',
    fontFamily: getFontFamily('Roboto', 700),
    letterSpacing: horizontalScale(0.5),
  },
  describe: {
    color: '#6c6b6b',
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(14),
    fontFamily: getFontFamily('Roboto', 600),
    letterSpacing: horizontalScale(0.2),
    marginTop: verticalScale(3),
  },
});
