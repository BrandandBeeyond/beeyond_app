import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {LoginStyle} from '../Login/Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from '../Login/AuthHeader';
import {OtpInput} from 'react-native-otp-entry';

import {useDispatch, useSelector} from 'react-redux';
import {OtpStyle} from '../Otpscreen/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {Routes} from '../../navigation/Routes';
import {VerifyOTPEmail} from '../../redux/actions/UserAction';

const ResetPassword = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {email} = route.params || '';
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState('');

  // for password fields
  const [otpValid, setOtpValid] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordInputEnabled, setIsPasswordInputEnabled] = useState(false);

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

  const handleVerifyOtp = useCallback(async () => {
    if (otp.length === 6) {
      try {
        const response = await dispatch(VerifyOTPEmail(otp, email));

        console.log('OTP Verification Response:', response);

        if (response?.success) {
          setOtpValid(true);
          setIsPasswordInputEnabled(true);
          setIsButtonDisabled(false);
        } else {
          setOtpValid(false);
          setIsPasswordInputEnabled(false);
          setIsButtonDisabled(true);
        }
      } catch (error) {
        console.error('OTP verification failed:', error);
        setOtpValid(false);
        setIsPasswordInputEnabled(false);
        setIsButtonDisabled(true);
      }
    }
  }, [otp, email, dispatch]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp, handleVerifyOtp]);

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Enter 6 Digit OTP'}
        description={`OTP has been sent to ${email} for verification`}
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
            focusColor={
              otpValid === true
                ? 'green'
                : otpValid === false
                ? 'red'
                : '#f9b000'
            }
            type="numeric"
            onTextChange={text => {
              setOtp(text);

              if (text.length === 6) {
                handleVerifyOtp();
              } else {
                setOtpValid(null); // Reset validation if OTP is not complete
              }
            }}
            theme={{
              pinCodeContainerStyle: [
                OtpStyle.pinCodeContainer,
                {
                  borderColor:
                    otpValid === true
                      ? 'green'
                      : otpValid === false
                      ? 'red'
                      : '#ccc',
                  shadowColor:
                    otpValid === true
                      ? 'green'
                      : otpValid === false
                      ? 'red'
                      : 'transparent',
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                  elevation: 5,
                },
              ],
              pinCodeTextStyle: OtpStyle.pincodeText,
            }}
          />
        </View>
        {otpValid !== null && (
          <Text
            style={{
              textAlign: 'center',
              color: otpValid ? 'green' : 'red',
              marginTop: 10,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {otpValid ? 'Number verified' : 'OTP is incorrect'}
          </Text>
        )}
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
        <View style={[LoginStyle.emailinput, globalStyle.mt30]}>
          <View style={globalStyle.relative}>
            <TextInput
              placeholder="Password"
              style={LoginStyle.emailpass}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <Pressable
              style={LoginStyle.showCloseIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                size={18}
                color={'#010101'}
              />
            </Pressable>
          </View>
        </View>
        <View style={globalStyle.px10}>
          <Pressable
            style={[
              LoginStyle.loginBtn,
              {backgroundColor: isButtonDisabled ? '#b4b3b3' : '#010101'},
            ]}
            disabled={isButtonDisabled}>
            {loading ? (
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg5,
                ]}>
                <ActivityIndicator size={20} color={'#fff'} />
                <Text style={LoginStyle.loginBtnText}>Continue</Text>
              </View>
            ) : (
              <View>
                <Text style={LoginStyle.loginBtnText}>Continue</Text>
              </View>
            )}
          </Pressable>
        </View>

        <Pressable onPress={() => navigation.navigate(Routes.Mobilelogin)}>
          <Text
            style={[
              globalStyle.subtext,
              globalStyle.textCenter,
              globalStyle.fw700,
            ]}>
            Back to sign in
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
