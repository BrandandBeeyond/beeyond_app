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
import {checkUserExists, UserLogin} from '../../redux/actions/UserAction';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

const LoginEmail = ({navigation}) => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Function to enable/disable button
  const validateFields = (email, password) => {
    setIsButtonDisabled(email.trim() === '' || password.trim() === '');
  };

  const handleEmailChange = text => {
    setEmail(text);
    validateFields(text, password);
  };

  const handlePasswordChange = text => {
    setPassword(text);
    validateFields(email, text);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await dispatch(UserLogin(email, password));

      if (isAuthenticated) {
        navigation.navigate('BottomTabs');
      }
    } catch (error) {
      console.error(error);
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
          <View style={LoginStyle.emailinput}>
            <View style={globalStyle.relative}>
              <TextInput
                placeholder="Password"
                style={LoginStyle.emailpass}
                value={password}
                onChangeText={handlePasswordChange}
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
              onPress={handleLogin}
              disabled={isButtonDisabled}>
              {loading ? (
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
                <Text style={LoginStyle.loginBtnText}>Sign in</Text>
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

export default LoginEmail;
