import React, {useEffect, useRef} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {LoginStyle} from './Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {useState} from 'react';
import {faEye} from '@fortawesome/free-regular-svg-icons/faEye';

const LoginEmailpass = () => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!(email.trim() !== '' && password.length >= 6));
  }, [email, password]);
  return (
    <View style={globalStyle.mt20}>
      <View style={LoginStyle.emailinput}>
        <Pressable>
          <TextInput
            placeholder="Email"
            style={LoginStyle.emailpass}
            ref={emailRef}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Pressable>
      </View>
      <View style={LoginStyle.emailinput}>
        <Pressable style={globalStyle.relative}>
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
        </Pressable>
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
          ]}>
          <View>
            <Text style={LoginStyle.loginBtnText}>Sign in</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginEmailpass;
