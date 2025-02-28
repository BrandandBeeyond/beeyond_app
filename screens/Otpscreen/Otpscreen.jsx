import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {LoginStyle} from '../Login/Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from '../Login/AuthHeader';
import {OtpInput} from 'react-native-otp-entry';
import {OtpStyle} from './Style';
import {useDispatch, useSelector} from 'react-redux';

const Otpscreen = ({route}) => {
  const dispatch = useDispatch();
  const {mobileNumber} = route.params || '';
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [otp, setOtp] = useState('');
  const {loading, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendOtpTimer = () => {
    setTimer(60);
    setIsTimerActive(true);
  };

  const formattedTimer = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const handleVerifyOtp = () => {
    try {
      if (otp.length === 6) {
        dispatch();
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Enter 6 Digit OTP'}
        description={`OTP has been sent to ${mobileNumber} for verification`}
      />
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
            theme={{
              pinCodeContainerStyle: OtpStyle.pinCodeContainer,
              pinCodeTextStyle: OtpStyle.pincodeText,
            }}
          />
        </View>
        <View
          style={[OtpStyle.otpNotRecived, globalStyle.px10, globalStyle.mt20]}>
          <Text style={OtpStyle.otpText}>did'nt recive code?</Text>
          <Pressable disabled={isTimerActive} onPress={handleResendOtpTimer}>
            <Text
              style={[
                OtpStyle.resendOtpText,
                {color: isTimerActive ? '#807f7f' : '#f9b000'},
              ]}>
              Resend otp
            </Text>
          </Pressable>
        </View>
        <View style={[globalStyle.mt10, globalStyle.px10]}>
          {isTimerActive ? (
            <Text
              style={[
                globalStyle.xsSmall,
                {fontWeight: 700, color: '#010101'},
              ]}>
              Resend OTP in {formattedTimer(timer)}
            </Text>
          ) : null}
        </View>
        <View style={globalStyle.px10}>
          <Pressable
            style={[
              LoginStyle.loginBtn,
              {backgroundColor: otp.length === 6 ? '#010101' : '#b4b3b3'},
            ]}
            onPress={handleVerifyOtp}
            disabled={otp.length !== 6 || loading}>
            {loading ? (
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

export default Otpscreen;
