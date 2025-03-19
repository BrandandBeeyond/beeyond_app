import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_SHIPPING_INFO_FAIL,
  ADD_SHIPPING_INFO_REQUEST,
  ADD_SHIPPING_INFO_SUCCESS,
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  CLEAR_ERRORS,
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
  VERIFY_MOBILE_OTP_FAIL,
  VERIFY_MOBILE_OTP_REQUEST,
  VERIFY_MOBILE_OTP_SUCCESS,
} from '../constants/UserConstants';
import {SAVE_SHIPPING_INFO} from '../constants/CartConstants';

const initialState = {
  // user: {},
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userExists: null,
  otpSentEmail: false,
  otpVerfiedEmail: false,
  otpSentMobile: false,
  otpVerfiedMobile: false,
  shippingInfo: [],
};

const updateUserInitialState = {
  loading: false,
  isUpdated: false,
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case CHECK_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case SEND_EMAIL_OTP_REQUEST:
    case SEND_MOBILE_OTP_REQUEST:
    case VERIFY_MOBILE_OTP_REQUEST:
    case VERIFY_EMAIL_OTP_REQUEST:
    case ADD_SHIPPING_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };

    case CHECK_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userExists: action.payload,
      };

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case VERIFY_EMAIL_OTP_SUCCESS:
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        otpVerfiedEmail: action.type || VERIFY_EMAIL_OTP_SUCCESS,
        otpVerfiedMobile: action.type || VERIFY_MOBILE_OTP_SUCCESS,
      };

    case VERIFY_MOBILE_OTP_SUCCESS:
      if (action.payload) {
        AsyncStorage.setItem('user', JSON.stringify(action.payload));
      }
      return {
        ...state,
        loading: false,
        isAuthenticated: !!action.payload, // Only true if user exists
        user: action.payload || null, // Ensure `user` is null-safe
        otpVerfiedMobile: action.type === VERIFY_MOBILE_OTP_SUCCESS,
      };

    case SEND_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSentEmail: true,
      };

    case SEND_MOBILE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSentMobile: true,
      };

    case CHECK_USER_FAIL:
    case SEND_EMAIL_OTP_FAIL:
    case SEND_MOBILE_OTP_FAIL:
    case VERIFY_MOBILE_OTP_FAIL:
    case VERIFY_EMAIL_OTP_FAIL:
    case ADD_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        userExists: false,
        error: action.payload,
        otpSentEmail: false,
        otpSentMobile: false,
        otpVerfiedEmail: false,
        otpVerfiedMobile: false,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGOUT_USER_SUCCESS:
      AsyncStorage.removeItem('user');

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case ADD_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingInfo: [...state.shippingInfo, action.payload],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = updateUserInitialState, action) => {};
