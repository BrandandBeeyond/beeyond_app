import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
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
import {checkUserExists, UserGoogleLogin} from '../../redux/actions/UserAction';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import GoogleLogo from '../../assets/images/icons/google.png';
import {webClientId} from '../../config/serverApi';

const EmailEntry = ({navigation, route}) => {
  const emailRef = useRef(null);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (route.params?.showToast) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Password reset successfully!',
        autoClose: 3000,
        title: '',
        theme: 'dark',
      });
    }
  }, [route.params]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '947680701785-k2u8oos8v5mo4askagns1vabpsevd9bh.apps.googleusercontent.com',
      offlineAccess: true,
    });

    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = text => {
    setEmail(text);
    setIsButtonDisabled(!isValidEmail(text));
  };

  const handleContinue = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const userExist = await dispatch(checkUserExists(email));
      if (userExist) {
        navigation.navigate(Routes.PasswordEntry, {email});
      } else {
        navigation.navigate(Routes.Signup, {email});
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleButtonPress = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();

      // Frontend test only — log token and user info
      console.log('Google Sign-In Success:', {idToken, user});

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: `Welcome ${user.name}`,
      });

      // Temporarily skip API and navigation for testing
      // navigation.navigate(Routes.Home); // Optional: enable this if you want post-login navigation
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: 'Google sign-in failed. Please try again.',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader title={'Enter email to get started'} />
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
              onPress={handleContinue}>
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
                <Text style={LoginStyle.loginBtnText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>

        <View style={globalStyle.container}>
          <View style={LoginStyle.line}></View>
          <Text style={globalStyle.orText}>OR</Text>
          <View style={LoginStyle.line}></View>
        </View>

        <View style={[globalStyle.mt10, globalStyle.px10]}>
          <Pressable
            onPress={onGoogleButtonPress}
            style={[
              globalStyle.drow,
              globalStyle.alignCenter,
              globalStyle.cg5,
              LoginStyle.signgoogle,
            ]}>
            <Image source={GoogleLogo} style={{width: 25, height: 25}} />
            <Text style={LoginStyle.mobilebtnText}>Sign in with Google</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailEntry;
