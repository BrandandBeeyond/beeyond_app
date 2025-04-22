import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  sendMobileOtp,
  UserRegister,
  userRegisterOtp,
} from '../../redux/actions/UserAction';

const Signup = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {email} = route.params || {};
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {loading, user, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (
      name.trim() &&
      /^[6-9]\d{9}$/.test(mobile.trim()) &&
      password.trim().length >= 6
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, mobile, password]);

  const handleRegister = async () => {
    try {
      const otpResponse = await dispatch(sendMobileOtp(mobile));

      if (otpResponse?.success) {
        navigation.replace('OtpScreenNewuser', {
          name,
          mobileNumber:mobile,
          email,
          password,
        });
      } else {
        console.warn('OTP not sent:', otpResponse?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error sending mobile OTP:', error);
      console.log('Error Response:', error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Looks like you are new here!'}
        description={'Provide below information to proceed'}
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
              placeholder="User Name"
              style={LoginStyle.emailpass}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={LoginStyle.emailinput}>
            <TextInput
              placeholder="Mobile No"
              style={LoginStyle.emailpass}
              keyboardType="numeric"
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
          </View>

          <View style={LoginStyle.emailinput}>
            <View style={globalStyle.relative}>
              <TextInput
                placeholder="Password"
                style={LoginStyle.emailpass}
                value={password}
                onChangeText={text => setPassword(text)}
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
              disabled={isButtonDisabled}
              onPress={handleRegister}>
              {loading ? (
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg5,
                  ]}>
                  <ActivityIndicator size={20} color={'#fff'} />
                  <Text style={LoginStyle.loginBtnText}>Sign up</Text>
                </View>
              ) : (
                <Text style={LoginStyle.loginBtnText}>Sign up</Text>
              )}
            </Pressable>
          </View>
        </View>
        <View style={globalStyle.container}>
          <View style={LoginStyle.line}></View>
          <Text style={globalStyle.orText}>OR</Text>
          <View style={LoginStyle.line}></View>
        </View>
        <View style={globalStyle.px10}>
          <Pressable
            style={LoginStyle.mobilebtn}
            onPress={() => navigation.navigate(Routes.Mobilelogin)}>
            <Text style={LoginStyle.mobilebtnText}>continue with mobile</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
