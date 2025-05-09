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
  Dialog,
  Toast,
} from 'react-native-alert-notification';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import GoogleLogo from '../../assets/images/icons/google.png';

const EmailEntry = ({navigation, route}) => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (route.params?.showToast) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Password reset successfully!',
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
  }, [route.params]);

  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

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

  const handleContinue = async () => {
    if (!email.trim()) return;

    setLoading(true);
    try {
      const userExist = await dispatch(checkUserExists(email));

      console.log('user availability', userExist);

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
    if (isSigningIn) return; // Prevent multiple calls

    setIsSigningIn(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: `Welcome ${userInfo.user.name}`,
      });

      navigation.navigate(Routes.Home);
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
