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
import {CheckUserExists} from '../../redux/actions/UserAction';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const EmailEntry = ({navigation}) => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // const {isAuthenticated, error} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleEmailChange = text => {
    setEmail(text);
    setIsButtonDisabled(text.trim() === '');
  };

  const handleContinue = async () => {
    setLoading(true);

    const userExists = await dispatch(CheckUserExists(email));

    if (userExists) {
      navigation.navigate(Routes.PasswordEntry,{email});
    } else {
      navigation.navigate('BottomTabs');
    }

    setLoading(false);
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
            <Pressable>
              <TextInput
                placeholder="Email"
                style={LoginStyle.emailpass}
                ref={emailRef}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleEmailChange}
                disabled={isButtonDisabled}
              />
            </Pressable>
          </View>

          <View style={globalStyle.px10}>
            <Pressable
              style={[
                LoginStyle.loginBtn,
                {backgroundColor: isButtonDisabled ? '#b4b3b3' : '#010101'},
              ]} onPress={handleContinue}>
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

export default EmailEntry;
