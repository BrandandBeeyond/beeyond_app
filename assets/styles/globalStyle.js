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
    display: 'flex',
    alignItems: 'center',
  },
  textWhite: {
    color: '#fff',
  },
  textSlate: {
    color: '#575757',
    fontWeight: '700',
  },
  drow: {
    display: 'flex',
    flexDirection: 'row',
  },
  dcol: {
    display: 'flex',
    flexDirection: 'column',
  },
  g2: {
    display: 'flex',
    gap: verticalScale(5),
  },
  cg3: {
    display: 'flex',
    gap: verticalScale(4),
  },
  cg5: {
    display: 'flex',
    gap: verticalScale(8),
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
  justifyBetween: {
    justifyContent: 'space-between',
  },
  cg20: {
    columnGap: 120,
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
  fw700: {
    fontWeight: 700,
    opacity: 0.8,
  },
  rounded3: {
    borderRadius: horizontalScale(10),
  },
  mx10: {
    marginHorizontal: horizontalScale(10),
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
  medium: {
    color: '#232222',
    fontSize: scaleFontSize(14.3),
    textTransform: 'capitalize',
    fontFamily: getFontFamily('Roboto'),
  },
  xsSmall: {
    fontSize: scaleFontSize(11),
    lineHeight: verticalScale(13),
  },
  shadowSm: {
    boxShadow:
      '0 2px 2px 0 rgba(235, 229, 229, 0.5),0 2px 2px 0 rgb(219, 210, 210)',
  },
  bgTheme: {
    backgroundColor: '#eeeeee',
  },
  mt3: {
    marginTop: verticalScale(3),
  },
  mt5: {
    marginTop: verticalScale(5),
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
  card: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: '#fff',
  },
  borderTopRadius: {
    borderTopLeftRadius: verticalScale(6),
    borderTopRightRadius: verticalScale(6),
  },
  borderBottomRadius: {
    borderBottomLeftRadius: verticalScale(6),
    borderBottomRightRadius: verticalScale(6),
  },
  cardOuter: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: horizontalScale(6),
  },
  xxsSmall: {
    fontSize: scaleFontSize(9),
    lineHeight: verticalScale(12),
  },
  mb80: {
    marginBottom: verticalScale(80),
  },
  p5: {
    padding: horizontalScale(8),
  },
  avatar: {
    backgroundColor: '#fff',
    borderRadius: horizontalScale(10),
    width: horizontalScale(85),
    height: verticalScale(80),
    padding: horizontalScale(4),
  },
  avatarInner: {
    backgroundColor: '#f4eee0',
    height: '100%',
    width: '100%',
    borderRadius: horizontalScale(10),
    display: 'flex',
    justifyContent: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: scaleFontSize(14),
    fontWeight: '700',
  },
  rightarricon: {
    left: horizontalScale(40),
    top: verticalScale(2),
  },
  userdetail: {
    color: '#f1f1f1',
  },
  textLight: {
    color: '#F1F1F1',
  },
  textGray: {
    color: '#111',
  },
  breakable: {
    height: verticalScale(0.6),
    backgroundColor: '#ccc',
    marginVertical: verticalScale(10),
  },
  emailInputUpdate: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#111',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: horizontalScale(5),
    paddingHorizontal: horizontalScale(9),
  },
  p8: {
    padding: verticalScale(12),
  },
  fwbold: {
    fontWeight: '700',
  },
  fwsemibold: {
    fontWeight: '600',
  },
  normalText: {
    color: '#232222',
    fontSize: scaleFontSize(13),
    textTransform: 'capitalize',
    fontFamily: getFontFamily('Roboto'),
  },
  my10: {
    marginVertical: verticalScale(10),
  },
  contentHead: {
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(16.5),
    fontWeight: '500',
    color: '#000',
    textTransform: 'capitalize',
  },
  contnentPara: {
    fontSize: scaleFontSize(10),
    lineHeight: verticalScale(13),
    fontWeight: '400',
    color: '#111',
  },
  avatarContact: {
    height: verticalScale(80),
    width: horizontalScale(100),
  },
  px2: {
    paddingHorizontal: horizontalScale(2),
  },
  my15: {
    marginVertical: verticalScale(15),
  },
  mt15: {
    marginTop: verticalScale(15),
  },
  bgSemiLight: {
    backgroundColor: '#f1f1f1',
  },
  fs1: {
    fontSize: scaleFontSize(20),
    fontWeight: '600',
  },
  orderText: {
    fontSize: scaleFontSize(14),
    color: '#010101',
  },
  fillbtn: {
    width: 340,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(20),
    borderRadius: horizontalScale(100),
    alignItems: 'center',
    backgroundColor: '#010101',
    borderColor: '#010101',
  },
  outborderbtn: {
    width: 340,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(20),
    borderRadius: horizontalScale(100),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#010101',
  },
  h2: {
    fontSize: scaleFontSize(15),
  },
  h4: {
    fontSize: scaleFontSize(19),
    marginTop: verticalScale(10),
  },
  h6: {
    fontSize: scaleFontSize(13),
    marginVertical: verticalScale(5),
  },
  ps3:{
    paddingLeft:horizontalScale(10)
  }
});
