import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  CLEAR_ERRORS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from '../constants/UserConstants';

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: null,
  userExists: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case CHECK_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CHECK_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userExists: action.payload,
      };

    case LOGIN_USER_SUCCESS:
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

    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGOUT_USER_SUCCESS:
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
