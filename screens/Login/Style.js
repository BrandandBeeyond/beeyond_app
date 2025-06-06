import {verticalScale} from 'react-native-size-matters';
import {horizontalScale, scaleFontSize} from '../../assets/styles/Scaling';
import getFontFamily from '../../assets/fonts/helper';

const {StyleSheet} = require('react-native');

export const LoginStyle = StyleSheet.create({
  loginBg: {
    backgroundColor: '#f9b000',
  },
  loginLayout: {
    paddingTop: verticalScale(30),
    paddingHorizontal: horizontalScale(20),
  },
  emailinput: {
    backgroundColor: '#f5f5f5',
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(10),
    borderRadius: horizontalScale(100),
  },
  emailpass: {
    height: verticalScale(45),
    padding: horizontalScale(16),
    color:'#000'
  },
  loginBtn: {
    width: '100%',
    padding: horizontalScale(15),
    marginVertical: verticalScale(20),
    borderRadius: horizontalScale(100),
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(18),
    textTransform: 'capitalize',
    fontFamily: getFontFamily('Roboto', 700),
    letterSpacing: horizontalScale(0.5),
  },
  line: {
    flex: 1,
    height: 0.7,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: horizontalScale(20), // Space between the text and the lines
    fontSize: 16, // Adjust font size
    color: '#ccc', // Text color
    fontWeight: 700,
  },
  mobilebtn: {
    width: '100%',
    padding: horizontalScale(15),
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: verticalScale(20),
    borderRadius: horizontalScale(100),
    alignItems: 'center',
  },
  mobilebtnText: {
    color: '#000',
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(18),
    textTransform: 'capitalize',
    fontFamily: getFontFamily('Roboto', 700),
    letterSpacing: horizontalScale(0.5),
  },
  emailOtpBtn:{
    width: '100%',
    padding: horizontalScale(15),
    backgroundColor:'#000',
    borderColor: '#000',
    marginVertical: verticalScale(20),
    borderRadius: horizontalScale(100),
    alignItems: 'center',
  },
  emailOtpBtnText:{
    color:'#fff',
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(18),
    textTransform: 'capitalize',
    fontFamily: getFontFamily('Roboto', 700),
    letterSpacing: horizontalScale(0.5),
  },
  showCloseIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  showCloseIconChangePass: {
    position: 'absolute',
    top: 42,
    right: 20,
  },
  signgoogle:{
    borderWidth:1,
    borderColor:'#000',
    justifyContent:'center',
    padding: horizontalScale(15),
    borderRadius:horizontalScale(100)
  }
});
