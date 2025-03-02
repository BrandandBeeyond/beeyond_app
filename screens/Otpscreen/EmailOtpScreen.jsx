import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {LoginStyle} from '../Login/Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from '../Login/AuthHeader';
import {OtpInput} from 'react-native-otp-entry';
import {OtpStyle} from './Style';
import {useDispatch, useSelector} from 'react-redux';
import {SendOTPEmail, VerifyOTPEmail} from '../../redux/actions/UserAction';

const EmailOtpScreen = ({route, navigation}) => {
  const {email} = route.params || '';
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isOtpInvalid, setIsOtpInvalid] = useState(false); 
  const [loadingVerify, setLoadingVerify] = useState(false);

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Profile');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const handleResendOtpTimer = async () => {
    setTimer(60);
    setIsTimerActive(true);

    try {
      await dispatch(SendOTPEmail(email));
    } catch (error) {
      console.error('error sending otp to email');
    }
  };

  const handleVerifyOtp = async () => {
    setLoadingVerify(true);
    if (otp.length === 6) {
      try {
        const response = await dispatch(VerifyOTPEmail(email, otp));
        if (response?.success) {
          setIsOtpInvalid(false); // OTP is valid
        } else {
          setIsOtpInvalid(true); // OTP is invalid
        }
      } catch (error) {
        setIsOtpInvalid(true);
      }finally{
        setLoadingVerify(false);
      }
    }
  };

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader title={`Enter 6 Digit OTP sent to ${email}`} />
      <View
        style={[
          globalStyle.bgWhite,
          globalStyle.px10,
          globalStyle.roundedCorners,
          globalStyle.h100,
        ]}>
        <View style={[globalStyle.mt40, globalStyle.px10]}>
          <OtpInput
            numberOfDigits={6}
            focusColor={'#f9b000'}
            type="numeric"
            onFilled={value => {
              setOtp(value);
              setIsOtpInvalid(false); // Clear error when OTP changes
            }}
            theme={{
              pinCodeContainerStyle: [
                OtpStyle.pinCodeContainer,
                isOtpInvalid ? {borderColor: 'red', shadowColor: 'red'} : {},
              ],
              pinCodeTextStyle: OtpStyle.pincodeText,
            }}
          />
          {isOtpInvalid && (
            <Text style={[globalStyle.subtext, {color: 'red', marginTop: 10}]}>
              Invalid OTP. Try again.
            </Text>
          )}
        </View>

        <View
          style={[OtpStyle.otpNotRecived, globalStyle.px10, globalStyle.mt20]}>
          <Text style={OtpStyle.otpText}>Didn't receive code?</Text>
          <Pressable disabled={isTimerActive} onPress={handleResendOtpTimer}>
            <Text
              style={[
                OtpStyle.resendOtpText,
                {color: isTimerActive ? '#807f7f' : '#f9b000'},
              ]}>
              Resend OTP
            </Text>
          </Pressable>
        </View>

        <View style={[globalStyle.mt10, globalStyle.px10]}>
          {isTimerActive && (
            <Text
              style={[
                globalStyle.xsSmall,
                {fontWeight: '700', color: '#010101'},
              ]}>
              Resend OTP in {`0${Math.floor(timer / 60)}`}:
              {(timer % 60).toString().padStart(2, '0')}
            </Text>
          )}
        </View>

        <View style={globalStyle.px10}>
          <Pressable
            style={[
              LoginStyle.loginBtn,
              {backgroundColor: otp.length === 6 ? '#010101' : '#b4b3b3'},
            ]}
            onPress={handleVerifyOtp}
            disabled={otp.length !== 6 || loadingVerify}>
            {loadingVerify ? (
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg5,
                ]}>
                <ActivityIndicator size={20} color={'#fff'} />
                <Text style={LoginStyle.loginBtnText}>Verifying...</Text>
              </View>
            ) : (
              <Text style={LoginStyle.loginBtnText}>Verify</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailOtpScreen;
