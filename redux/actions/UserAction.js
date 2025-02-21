import axios from 'axios';
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from '../constants/UserConstants';
import {serverApi} from '../../config/serverApi';

// export const checkUserExists = email => async dispatch => {
//   try {
//     dispatch({ type: CHECK_USER_REQUEST });

//     const { data } = await axios.post(
//       `${serverApi}/check-user`,
//       { email },
//       {
//         timeout: 5000,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );

//     console.log('Raw API Response:', data);

//     if (data?.success && typeof data?.userExists === 'boolean') {
//       const userExists = data.userExists;
//       dispatch({ type: CHECK_USER_SUCCESS, payload: userExists });
//       return userExists;
//     }

//     throw new Error('Invalid API response structure');

//   } catch (error) {
//     console.error('API Error:', error.response?.data || error.message);

//     dispatch({
//       type: CHECK_USER_FAIL,
//       payload: error.response?.data?.message || error.message,
//     });

//     return false;
//   }
// };

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

export const logoutUser = () => async dispatch => {
  dispatch({type: LOGOUT_USER_SUCCESS});
};
