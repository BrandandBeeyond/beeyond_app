import axios from 'axios';
import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SEND_EMAIL_OTP_FAIL,
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_MOBILE_OTP_FAIL,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  VERIFY_EMAIL_OTP_FAIL,
  VERIFY_EMAIL_OTP_REQUEST,
  VERIFY_EMAIL_OTP_SUCCESS,
} from '../constants/UserConstants';
import {serverApi} from '../../config/serverApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUserExists = email => async dispatch => {
  try {
    dispatch({type: CHECK_USER_REQUEST});

    const {data} = await axios.post(`${serverApi}/check-user`, {email});

    dispatch({type: CHECK_USER_SUCCESS, payload: data.userExists});
    return data.userExists;
  } catch (error) {
    console.error('something wents wrong');

    dispatch({
      type: CHECK_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });

    return false;
  }
};

export const loadUser = () => async dispatch => {
  try {
    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser) {
      dispatch({type: LOAD_USER_SUCCESS, payload: JSON.parse(storedUser)});
    } else {
      dispatch({type: LOAD_USER_FAIL});
    }
  } catch (error) {
    console.error('Error loading user from AsyncStorage:', error);
    dispatch({type: LOAD_USER_FAIL});
  }
};

export const UserLogin = (email, password) => async dispatch => {
  try {
    dispatch({type: LOGIN_USER_REQUEST});

    const config = {
      headers: {'Content-Type': 'application/json'},
    };

    const {data} = await axios.post(
      `${serverApi}/login`,
      {email, password},
      config,
    );

    if (data?.user) {
      dispatch({type: LOGIN_USER_SUCCESS, payload: data.user});
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data?.message || 'Something went wrong',
    });
  }
};

export const UserRegister =
  (name, mobile, email, password) => async dispatch => {
    try {
      dispatch({type: REGISTER_USER_REQUEST});

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {data} = await axios.post(
        `${serverApi}/register`,
        {name, mobile, password, email},
        config,
      );

      dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
      console.error(
        'Registration Error:',
        error.response?.data || error.message,
      );
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

export const SendOTPEmail = email => async dispatch => {
  try {
    dispatch({type: SEND_EMAIL_OTP_REQUEST});

    const {data} = await axios.post(`${serverApi}/send-email-otp`, {email});

    dispatch({
      type: SEND_EMAIL_OTP_SUCCESS,
      payload: data.message,
    });

    return {success: true, message: data.message};
  } catch (error) {
    dispatch({
      type: SEND_EMAIL_OTP_FAIL,
      payload: error.response?.data?.message || 'Failed to send OTP',
    });
  }
};

export const VerifyOTPEmail = (email, otp) => async dispatch => {
  try {
    dispatch({type: VERIFY_EMAIL_OTP_REQUEST});

    const {data} = await axios.post(`${serverApi}/verify-email-otp`, {
      email,
      otp,
    });

    dispatch({
      type: VERIFY_EMAIL_OTP_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_OTP_FAIL,
      payload: error.response?.data?.message || 'Failed to verify OTP',
    });
  }
};

export const sendMobileOtp = mobileNumber => async dispatch => {
  try {
    dispatch({type: SEND_MOBILE_OTP_REQUEST});

    const {data} = await axios.post(`${serverApi}/send-otp`, {mobile:mobileNumber});

    dispatch({
      type: SEND_MOBILE_OTP_SUCCESS,
      payload: data.message,
    });

    return {success: true, message: data.message};
  } catch (error) {
    dispatch({
      type: SEND_MOBILE_OTP_FAIL,
      payload: error.response?.data?.message || 'Failed to send OTP',
    });
    return { success: false, message: error.response?.data?.message || 'Failed to send OTP' };
  }
};

export const logoutUser = () => async dispatch => {
  dispatch({type: LOGOUT_USER_SUCCESS});
};
