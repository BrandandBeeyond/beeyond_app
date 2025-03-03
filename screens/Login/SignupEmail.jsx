import React, {useEffect, useState} from 'react';
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
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {UserRegister} from '../../redux/actions/UserAction';
import axios from 'axios';

const SignupEmail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isMobileVerified, mobileNumber} = route.params || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name.trim() && password.trim().length >= 6) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, password]);

  useEffect(() => {
    if (!isMobileVerified) {
      navigation.replace('OtpScreen');
    }
  }, [isMobileVerified, navigation]);

  const handleRegister = async () => {
    try {
      const response = await dispatch(
        UserRegister(name, mobileNumber, email, password),
      );

      console.log('this is response', response);

      if (response?.success) {
        navigation.replace('BottomTabs', {isMobileVerified: true});
      } else {
        Alert.alert('Unable to register user');
      }
    } catch (error) {
      Alert.alert('Internal server error');
      console.error('internal server error', error);
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
          <View style={[globalStyle.px10, globalStyle.mt10]}>
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
                  <Text style={LoginStyle.loginBtnText}>Submit</Text>
                </View>
              ) : (
                <View>
                  <Text style={LoginStyle.loginBtnText}>Submit</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupEmail;
