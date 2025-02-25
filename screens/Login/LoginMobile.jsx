import React, {useEffect, useRef, useState} from 'react';
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
import {Routes} from '../../navigation/Routes';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {serverApi} from '../../config/serverApi';

const LoginMobile = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  const sendOtp = async () => {
    if (!isValidMobileNumber) return;
    console.log('Final Mobile Number (before sending OTP):', mobileNumber);
    setLoading(true);
    try {
      const response = await axios.post(`${serverApi}/send-otp`, {
        mobile: `91${mobileNumber}`,
      });

      if (response.data.success) {
        navigation.navigate(Routes.OtpScreen, {mobile: mobileNumber});
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };
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
            onPress={sendOtp}
            disabled={!isValidMobileNumber || loading}>
            {loading ? (
              <>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg5,
                  ]}>
                  <ActivityIndicator size={20} color={'#fff'} />
                  <View>
                    <Text style={LoginStyle.loginBtnText}>Sending</Text>
                  </View>
                </View>
              </>
            ) : (
              <View>
                <Text style={LoginStyle.loginBtnText}>Send</Text>
              </View>
            )}
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
            onPress={() => navigation.navigate(Routes.EmailEntry)}>
            <Text style={LoginStyle.mobilebtnText}>continue with email</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginMobile;
