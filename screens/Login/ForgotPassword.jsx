import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {LoginStyle} from './Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from './AuthHeader';
import {Routes} from '../../navigation/Routes';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {checkUserExists, SendOTPEmail} from '../../redux/actions/UserAction';

const ForgotPassword = ({route, navigation}) => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState(route.params?.email || '');

  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(!email);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Function to enable/disable button

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = text => {
    setEmail(text);
    setIsButtonDisabled(!isValidEmail(text));
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await dispatch(SendOTPEmail(email));

      if (response.success) {
        navigation.navigate(Routes.ResetPassword, {email});
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Forgot password'}
        description={'Enter registered email to recieve the verification code'}
      />
      <View
        style={[
          globalStyle.bgWhite,
          globalStyle.px10,
          globalStyle.roundedCorners,
          globalStyle.h100,
        ]}>
        <View style={globalStyle.mt20}>
          <View style={LoginStyle.emailinput}>
            <TextInput
              placeholder="Email"
              style={LoginStyle.emailpass}
              ref={emailRef}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleEmailChange}
            />
          </View>

          <View style={globalStyle.px10}>
            <Pressable
              style={[
                LoginStyle.loginBtn,
                {backgroundColor: isButtonDisabled ? '#b4b3b3' : '#010101'},
              ]}
              disabled={isButtonDisabled}
              onPress={handleForgotPassword}>
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

            <Pressable onPress={() => navigation.navigate(Routes.Mobilelogin)}>
              <Text
                style={[
                  globalStyle.subtext,
                  globalStyle.textCenter,
                  globalStyle.fw700,
                ]}>
                Sign in
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
