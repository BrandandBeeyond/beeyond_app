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
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import GoogleLogo from '../../assets/images/icons/google.png';


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

  GoogleSignin.configure({
    webClientId:
      '947680701785-54p2qd7vu918l4u0uufd7lohejbq6cse.apps.googleusercontent.com',
    offlineAccess: true,
  });

  useEffect(() => {
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
      const isAvailable = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('Play Services Available:', isAvailable);

      if (!isAvailable) {
        throw new Error('Play services are not available on the device');
      }

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      console.log('Firebase Google Sign-In Success:', userCredential.user);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: `Welcome ${userCredential.user.displayName}`,
      });

      navigation.navigate(Routes.Home);
    } catch (error) {
      console.error('Firebase Google Sign-In Error:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: `Google sign-in failed. Please try again. Error: ${error.message}`,
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader
        title={'Enter email to get started'}
        description={'Shopping gets more rewarding'}
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
