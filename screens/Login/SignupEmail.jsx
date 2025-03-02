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
import {UserRegister} from '../../redux/actions/UserAction';

const SignupEmail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {mobile} = route.params || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {loading, isAuthenticated} = useSelector(state => state.user);

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
      await dispatch(UserRegister(name, mobile, email, password));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('BottomTabs');
    }
  }, [isAuthenticated, navigation]);

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
              placeholder="Email"
              style={LoginStyle.emailpass}
              value={email}
              onChangeText={text => setEmail(text)}
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
                <View>
                  <Text style={LoginStyle.loginBtnText}>Sign up</Text>
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
            style={LoginStyle.mobilebtn}
            onPress={() => navigation.navigate(Routes.Mobilelogin)}>
            <Text style={LoginStyle.mobilebtnText}>continue with mobile</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupEmail;
