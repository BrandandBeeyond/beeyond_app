import React, {useEffect, useRef, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {LoginStyle} from './Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import AuthHeader from './AuthHeader';
import {Routes} from '../../navigation/Routes';
import {TextInput} from 'react-native-gesture-handler';

const LoginMobile = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 10) {
      setMobileNumber(numericValue);
    }
  };

  const isValidMobileNumber = mobileNumber.length === 10;
  return (
    <SafeAreaView style={[LoginStyle.loginBg, globalStyle.flex]}>
      <AuthHeader title={'Continue with mobile'} />
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
                placeholder="Enter Mobile Number"
                style={LoginStyle.emailpass}
                keyboardType="number-pad"
                value={mobileNumber}
                onChangeText={handleInputChange}
                ref={inputRef}
              />
            </Pressable>
          </View>
        </View>
        <View style={[globalStyle.px10, globalStyle.mt10]}>
          <Pressable
            style={[
              LoginStyle.loginBtn,
              {backgroundColor: isValidMobileNumber ? '#010101' : '#b4b3b3'},
            ]}
            onPress={()=>navigation.navigate(Routes.OtpScreen,{mobile:mobileNumber})}
            disabled={!isValidMobileNumber}>
            <View>
              <Text style={LoginStyle.loginBtnText}>Send OTP</Text>
            </View>
          </Pressable>
        </View>

        <View style={globalStyle.container}>
          <View style={LoginStyle.line}></View>
          <Text style={globalStyle.orText}>OR</Text>
          <View style={LoginStyle.line}></View>
        </View>

        <View style={globalStyle.px10}>
          <Pressable
            style={LoginStyle.mobilebtn}
            onPress={() => navigation.navigate(Routes.Login)}>
            <Text style={LoginStyle.mobilebtnText}>continue with email</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginMobile;
