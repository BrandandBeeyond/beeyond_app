import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  sendMobileOtp,
  userRegisterOtp,
  VerifyMobileOtp,
  verifyOtpAndRegisterUser,
} from '../../redux/actions/UserAction';
import {Routes} from '../../navigation/Routes';

const OtpScreenNewuser = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mobileNumber} = route.params || '';
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [otp, setOtp] = useState('');
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

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

  const handleResendOtpTimer = async () => {
    setTimer(60);
    setIsTimerActive(true);

    try {
      await dispatch(sendMobileOtp(mobileNumber));
    } catch (error) {
      console.error('error sending otp to email');
    }
  };

  const formattedTimer = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  // const handleVerifyOtp = async () => {
  //   if (otp.length !== 6) {
  //     Alert.alert('Please enter a valid OTP.');
  //     return;
  //   }

  //   setLoadingVerify(true);

  //   const result = await dispatch(VerifyMobileOtp(mobileNumber, otp));

  //   setLoadingVerify(false);

  //   if (result.success) {
  //     if (result.isRegistered === true) {
  //       console.log('user is registered or not', result.isRegistered);
  //       setIsOtpInvalid(false);
  //       navigation.navigate('Profile', {isMobileVerified: true});
  //     } else {
  //       navigation.navigate(Routes.SignupEmail, {
  //         isMobileVerified: true,
  //         mobileNumber,
  //       });
  //     }
  //   } else {
  //     setIsOtpInvalid(true);
  //   }
  // };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Please enter a valid OTP.');
      return;
    }

    setLoadingVerify(true);

    const {name, email, password} = route.params || {};

    console.log('this are results', name, email, password);

    const result = await dispatch(
      verifyOtpAndRegisterUser({
        name,
        email,
        password,
        mobile: mobileNumber,
        otp,
      }),
    );

    console.log('OTP + Registration Result:', result);
    setLoadingVerify(false);

    if (result?.success) {
      setIsOtpInvalid(false);
      navigation.replace('Home', { isMobileVerified: true,showToast:true });
    } else {
      setIsOtpInvalid(true);
      Alert.alert('Verification Failed', result?.message || 'Try again');
    }

    setLoadingVerify(false);
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

export default OtpScreenNewuser;
