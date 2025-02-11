import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from './Scaling';
import getFontFamily from '../fonts/helper';

export const globalStyle = StyleSheet.create({
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },
  dflex: {
    display: 'flex',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  w100: {
    width: '100%',
  },
  small: {
    fontSize: 12,
    lineHeight: 14,
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  HelloText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 700,
    color: '#f9b000',
    letterSpacing: 1,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  textCenter: {
    textAlign: 'center',
  },
  textEnd: {
    textAlign: 'right',
  },
  textsmall: {
    fontSize: verticalScale(11),
    lineHeight: verticalScale(14),
    fontWeight: 400,
  },
  pt10: {
    paddingTop: verticalScale(10),
  },
  px10: {
    paddingHorizontal: horizontalScale(10),
  },
  py10: {
    paddingVertical: verticalScale(10),
  },
  relative: {
    position: 'relative',
  },
  subtext: {
    color: '#232222',
    fontSize: scaleFontSize(14),
    textTransform: 'capitalize',
    fontFamily: getFontFamily('Roboto'),
  },
  xsSmall: {
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(14),
  },
  shadowSm: {
    boxShadow:
      '0 2px 2px 0 rgba(235, 229, 229, 0.5),0 2px 2px 0 rgb(219, 210, 210)',
  },
  bgTheme: {
    backgroundColor: '#f3ebd8',
  },
  mt10: {
    marginTop: verticalScale(10),
  },
  mt20: {
    marginTop: verticalScale(20),
  },
  mt30: {
    marginTop: verticalScale(30),
  },
  mt40: {
    marginTop: verticalScale(40),
  },
  mb20: {
    marginBottom: verticalScale(20),
  },
  pb10: {
    paddingBottom: verticalScale(10),
  },
  pb30: {
    paddingBottom: verticalScale(30),
  },
  px20: {
    paddingHorizontal: horizontalScale(20),
  },
  px25: {
    paddingHorizontal: horizontalScale(25),
  },
  my20: {
    marginVertical: verticalScale(20),
  },
  normalBorder: {
    borderWidth: horizontalScale(0.3),
    borderColor: '#ccc',
  },
  lottyani: {
    height: 170,
    aspectRatio: 1,
  },
  warnText: {
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(17),
    color: '#f9b000',
    fontFamily: getFontFamily('Roboto', 700),
    textTransform: 'uppercase',
  },
  roundedCorners: {
    borderTopLeftRadius: horizontalScale(35),
    borderTopRightRadius: horizontalScale(35),
  },
  h100: {
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
});
