import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
  TextInput,
} from 'react-native';
import {LoginStyle} from './Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from './AuthHeader';
import {useDispatch, useSelector} from 'react-redux';
import {SendOTPEmail, UserLogin} from '../../redux/actions/UserAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {Routes} from '../../navigation/Routes';
import {FlowTypes} from '../../flowTypes';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const PasswordEntry = ({route, navigation}) => {
  const {email} = route.params;
  const {isAuthenticated, loading} = useSelector(state => state.user);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [otploading, setOtploading] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setIsButtonDisabled(password.trim().length < 6);
  }, [password]);

  const handleSignIn = async () => {
    setSigninLoading(true);
    try {
      const response = await dispatch(UserLogin(email, password));

      if (response.success) {
        setErrorMessage('');
      } else {
        Toast.show({
              type: ALERT_TYPE.DANGER,
              textBody: 'Incorrect password!',
              autoClose: 3000,
              title: '',
              theme: 'dark',
              containerStyle: {
                height: 20,
                paddingVertical: 5,
                borderRadius: 8,
                backgroundColor: '#1c1c1e',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 4,
                elevation: 5,
              },
              textBodyStyle: {
                color: '#ffffff',
                fontSize: 14,
                fontWeight: '500',
              },
            });
      }
    } catch (error) {
      let errMsg = 'Something went wrong';
      if (error?.response?.data?.message) {
        errMsg = error.response.data.message;
      }
      setErrorMessage(errMsg);
    }
    setSigninLoading(false);
  };

  const handleSendEmailOtp = async () => {
    setOtploading(true);
    try {
      const response = await dispatch(SendOTPEmail(email));

      if (response.success) {
        navigation.navigate('EmailOtpScreen', {email});
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
    setOtploading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
         index:0,
          routes: [{ name: 'BottomTabs'}],
      });
    }
  }, [isAuthenticated, navigation]);

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Enter Password'}
        description={`Linked with ${email}`}
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
            <View style={globalStyle.relative}>
              <TextInput
                placeholder="Password"
                style={LoginStyle.emailpass}
                placeholderTextColor={'#000'}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (errorMessage) setErrorMessage('');
                }}
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

          {/* Error message under password field */}
          {errorMessage ? (
            <Text style={globalStyle.errorText}>{errorMessage}</Text>
          ) : null}

          <View style={[globalStyle.mt10, globalStyle.px20]}>
            <Pressable
              style={{alignSelf: 'flex-end'}}
              onPress={() =>
                navigation.navigate(Routes.ForgotPassword, {email})
              }>
              <Text style={[globalStyle.textEnd, globalStyle.subtext]}>
                Forgot password ?
              </Text>
            </Pressable>
          </View>

          <View style={globalStyle.px10}>
            <Pressable
              style={[
                LoginStyle.loginBtn,
                {backgroundColor: isButtonDisabled ? '#b4b3b3' : '#010101'},
              ]}
              onPress={handleSignIn}
              disabled={isButtonDisabled}>
              {signinLoading ? (
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg5,
                  ]}>
                  <ActivityIndicator size={20} color={'#fff'} />
                  <Text style={LoginStyle.loginBtnText}>Sign in</Text>
                </View>
              ) : (
                <View>
                  <Text style={LoginStyle.loginBtnText}>Sign in</Text>
                </View>
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
            style={LoginStyle.emailOtpBtn}
            onPress={handleSendEmailOtp}
            disabled={otploading}>
            {otploading ? (
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg3,
                ]}>
                <ActivityIndicator size={20} color={'#fff'} />
                <Text style={LoginStyle.emailOtpBtnText}>Sign in with OTP</Text>
              </View>
            ) : (
              <View>
                <Text style={LoginStyle.emailOtpBtnText}>Sign in with OTP</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordEntry;