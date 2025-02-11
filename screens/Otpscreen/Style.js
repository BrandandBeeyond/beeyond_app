import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/Scaling';
import {verticalScale} from 'react-native-size-matters';
import getFontFamily from '../../assets/fonts/helper';

export const OtpStyle = StyleSheet.create({
  pinCodeContainer: {
    width: horizontalScale(45),
    height: verticalScale(45),
    backgroundColor: '#f5f5f5',
  },
  pincodeText: {
    fontSize: scaleFontSize(15),
  },
  otpNotRecived: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otpText: {
    fontSize: scaleFontSize(13),
    lineHeight: verticalScale(17),
    fontFamily: getFontFamily('Roboto', 400),
    textTransform: 'capitalize',
    color: '#807f7f',
    letterSpacing: horizontalScale(0.2),
  },
  resendOtpText: {
    fontSize: scaleFontSize(13),
    lineHeight: verticalScale(17),
    fontFamily: getFontFamily('Roboto', 800),
    textTransform: 'uppercase',
    letterSpacing: horizontalScale(0.2),
  },
});
