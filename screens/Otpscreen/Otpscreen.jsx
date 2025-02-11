import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {LoginStyle} from '../Login/Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from '../Login/AuthHeader';
import {OtpInput} from 'react-native-otp-entry';
import {OtpStyle} from './Style';

const Otpscreen = ({route}) => {
  const {mobile} = route.params || '';
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);

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

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader title={`Enter 6 Digit OTP sent on ${mobile}`} />
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
      </View>
    </SafeAreaView>
  );
};

export default Otpscreen;
