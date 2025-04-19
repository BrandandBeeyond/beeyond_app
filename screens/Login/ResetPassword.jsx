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

import {useDispatch, useSelector} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {Routes} from '../../navigation/Routes';
import {resetPassword} from '../../redux/actions/UserAction';

const ResetPassword = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // for password fields

  const {email} = route.params || '';
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
   

    if (password.length >= 6 && password === confirmPassword) {
      setIsButtonDisabled(false);
      setError('');
    } else {
      setIsButtonDisabled(true);
      if (password !== confirmPassword && confirmPassword.length > 0) {
        setError('Passwords do not match');
      } else if (password.length < 6 && password.length > 0) {
        setError('Password must be at least 6 characters');
      } else {
        setError('');
      }
    }
  }, [password, confirmPassword]);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const response = await dispatch(resetPassword(email, password));

      console.log("getting response",response);
      
      if (response?.message === "Password reset successfully") {
        navigation.navigate(Routes.Profile);
      } else {
        setError('Failed to reset password. Try again.');
      }
    } catch (error) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Reset Password'}
        description={`Set up Strong password`}
      />
      <View
        style={[
          globalStyle.bgWhite,
          globalStyle.px10,
          globalStyle.roundedCorners,
          globalStyle.h100,
        ]}>
        <View style={[LoginStyle.emailinput, globalStyle.mt30]}>
          <View style={globalStyle.relative}>
            <TextInput
              placeholder="Create Password"
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
        <View style={[LoginStyle.emailinput, globalStyle.mt20]}>
          <View style={globalStyle.relative}>
            <TextInput
              placeholder="Confirm Password"
              style={LoginStyle.emailpass}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
        <View style={[globalStyle.px10, globalStyle.mt20]}>
          <Pressable
            style={[
              LoginStyle.loginBtn,
              {backgroundColor: isButtonDisabled ? '#b4b3b3' : '#010101'},
            ]}
            onPress={handleResetPassword}
            disabled={loading}>
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

          {error !== '' && (
            <Text
              style={[globalStyle.subtext, {color: 'red', marginVertical: 10}]}>
              {error}
            </Text>
          )}
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
