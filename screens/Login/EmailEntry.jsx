import React, {useEffect, useRef, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {checkUserExists} from '../../redux/actions/UserAction';

const EmailEntry = ({navigation}) => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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
        <View style={globalStyle.px10}>
          <Pressable
            style={LoginStyle.mobilebtn}
            onPress={() => navigation.navigate(Routes.Mobilelogin)}>
            <Text style={LoginStyle.mobilebtnText}>Continue with mobile</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailEntry;
