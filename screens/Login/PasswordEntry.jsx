import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
import {UserLogin} from '../../redux/actions/UserAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

const PasswordEntry = ({route, navigation}) => {
  const {email} = route.params;
  const {isAuthenticated, loading} = useSelector(state => state.user);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsButtonDisabled(password.trim().length < 6);
  }, [password]);

  const handleSignIn = async () => {
    await dispatch(UserLogin(email, password));
  };

  useEffect(()=>{
     if(isAuthenticated){
        navigation.replace('BottomTabs')
     }
  },[isAuthenticated,navigation]);

  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader title={'Enter Password'} description={`Linked with ${email}`}/>
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
          <View style={[globalStyle.mt10, globalStyle.px20]}>
            <Pressable>
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
            onPress={() => navigation.navigate('MobileLogin')}>
            <Text style={LoginStyle.mobilebtnText}>Sign in with OTP</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordEntry;
