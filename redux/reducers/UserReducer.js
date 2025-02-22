import AsyncStorage from '@react-native-async-storage/async-storage';
import {
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
} from '../constants/UserConstants';

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: null,
  userExists: null,
};

const loadUserfromStorage = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');

    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error loading user from AsyncStorage:', error);
    return null;
  }
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case CHECK_USER_REQUEST:
    case REGISTER_USER_REQUEST:
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
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case CHECK_USER_FAIL:
      return {
        ...state,
        loading: false,
        userExists: false,
        error: action.payload,
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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
