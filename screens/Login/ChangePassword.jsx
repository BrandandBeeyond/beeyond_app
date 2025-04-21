import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../assets/styles/globalStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {checkOutStyle} from '../Checkout/Style';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {serverApi} from '../../config/serverApi';
import {Routes} from '../../navigation/Routes';
import {LoginStyle} from './Style';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ChangePassword = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingChange, setLoadingChange] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (newPassword.length > 0 && newPassword.length <= 8) {
      setError('Password must be more than 8 characters');
    } else {
      setError('');
    }
  }, [newPassword]);

  const handleChangePassword = async () => {
    setError('');
  
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (newPassword.length <= 8) {
      setError('Password must be more than 8 characters');
      return;
    }
  
    setLoadingChange(true);
  
    try {
      const response = await axios.post(`${serverApi}/change-password`, {
        email: user?.email,
        currentPassword,
        newPassword,
        confirmPassword,
      });
  
      console.log('✅ Response from change-password:', response?.data);
  
      if (response?.data?.message === 'Password changed successfully') {
        navigation.navigate(Routes.MyAccount,{showToast:true});
      } else {
        setError('Failed to change password. Try again.');
      }
    } catch (error) {
      console.error('Error during password change:', error);
      setError(error?.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoadingChange(false);
    }
  };
  

  return (
    <SafeAreaView
      style={[
        globalStyle.flex,
        globalStyle.bgTheme,
        checkOutStyle.container,
        globalStyle.mt5,
      ]}>
      <ScrollView>
        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Mobile</Text>
          <TextInput
            style={checkOutStyle.input}
            value={user?.mobile}
            editable={false}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Email</Text>
          <TextInput
            style={checkOutStyle.input}
            value={user?.email}
            editable={false}
          />
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Current Password</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Enter current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            style={LoginStyle.showCloseIconChangePass}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              size={18}
              color={'#010101'}
            />
          </Pressable>
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>New Password</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
          />
           <Pressable
            style={LoginStyle.showCloseIconChangePass}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              size={18}
              color={'#010101'}
            />
          </Pressable>
        </View>

        <View style={checkOutStyle.inputContainer}>
          <Text style={checkOutStyle.label}>Confirm Password</Text>
          <TextInput
            style={checkOutStyle.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
           <Pressable
            style={LoginStyle.showCloseIconChangePass}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              size={18}
              color={'#010101'}
            />
          </Pressable>
        </View>

        <TouchableOpacity
          style={[
            checkOutStyle.ChangePassword,
            {
              backgroundColor: '#010101',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={handleChangePassword}
         >
          {loadingChange ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <Text style={globalStyle.textWhite}>Change Password</Text>
          )}
        </TouchableOpacity>

        {error ? (
          <Text style={[globalStyle.subtext, {color: 'red', marginTop: 10}]}>
            {error}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
