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
import {useDispatch, useSelector} from 'react-redux';
import {sendMobileOtp} from '../../redux/actions/UserAction';
import axios from 'axios';
import {serverApi} from '../../config/serverApi';

const LoginMobile = ({navigation}) => {
  const dispatch = useDispatch();
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

  const handleSendOtp = async () => {
    if (!isValidMobileNumber) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    try {
      setLoading(true);

      // ✅ Ensure correct payload format
      const response = await axios.post(`${serverApi}/send-otp`, {
        mobile: mobileNumber,
      });

      console.log('OTP API Response:', response.data); // Debugging response

      if (response.data?.success) {
        Alert.alert(
          'Success',
          response.data.message || 'OTP sent successfully.',
        );
      } else {
        Alert.alert('Error', response.data?.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending mobile OTP:', error);

      // ✅ Log detailed error response
      console.log('Error Response:', error.response?.data || error.message);

      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Failed to send OTP. Please try again.',
      );
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
            onPress={handleSendOtp}
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
