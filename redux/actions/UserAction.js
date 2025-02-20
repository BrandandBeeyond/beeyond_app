import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from '../constants/UserConstants';
import {users} from '../data/UserData';

export const CheckUserExists = email => async dispatch => {
  try {
    dispatch({type: CHECK_USER_REQUEST});

    if (!users || users.length === 0) {
      throw new Error('User data is unavailable');
    }

    const userExists = users.some(user => user.email === email);

    dispatch({type: CHECK_USER_SUCCESS, payload: userExists});
    return userExists; 
  } catch (error) {
    dispatch({type: CHECK_USER_FAIL, payload: 'Something went wrong'});
    return false;
  }
};

export const UserLogin = (email, password) => async dispatch => {
  try {
    dispatch({type: LOGIN_USER_REQUEST});

    if (!users || users.length === 0) {
      throw new Error('User data is unavailable');
    }

    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      dispatch({type: LOGIN_USER_SUCCESS, payload: user});
    } else {
      dispatch({type: LOGIN_USER_FAIL, payload: 'Invalid Credentials'});
    }
  } catch (error) {
    dispatch({type: LOGIN_USER_FAIL, payload: 'Something went wrong'});
  }
};

export const logoutUser = () => async dispatch => {
  dispatch({type: LOGOUT_USER_SUCCESS});
};
