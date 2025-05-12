import axios from 'axios';
import {
  ADD_SHIPPING_INFO_FAIL,
  ADD_SHIPPING_INFO_REQUEST,
  ADD_SHIPPING_INFO_SUCCESS,
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  GET_SHIPPING_INFO_FAIL,
  GET_SHIPPING_INFO_REQUEST,
  GET_SHIPPING_INFO_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_OTP_FAIL,
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_MOBILE_OTP_FAIL,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  UPDATE_SHIPPING_INFO_FAIL,
  UPDATE_SHIPPING_INFO_REQUEST,
  UPDATE_SHIPPING_INFO_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  VERIFY_EMAIL_OTP_FAIL,
  VERIFY_EMAIL_OTP_FORGOT_FAIL,
  VERIFY_EMAIL_OTP_FORGOT_REQUEST,
  VERIFY_EMAIL_OTP_FORGOT_SUCCESS,
  VERIFY_EMAIL_OTP_REQUEST,
  VERIFY_EMAIL_OTP_SUCCESS,
  VERIFY_MOBILE_OTP_FAIL,
  VERIFY_MOBILE_OTP_REQUEST,
  VERIFY_MOBILE_OTP_SUCCESS,
} from '../constants/UserConstants';
import {serverApi} from '../../config/serverApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_SHIPPING_INFO} from '../constants/CartConstants';

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
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      if (data?.shippingInfo) {
        await AsyncStorage.setItem(
          'shippingInfo',
          JSON.stringify(data.shippingInfo),
        );
      }

      dispatch({type: LOGIN_USER_SUCCESS, payload: data.user});

      // 👇 RETURN something for the caller
      return {success: true, user: data.user};
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);

    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data?.message || 'Something went wrong',
    });

    // 👇 RETURN the error manually for the caller
    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong',
    };
  }
};

export const UserGoogleLogin =
  (idToken, fcmToken = null) =>
  async dispatch => {
    try {
      console.log('Logging in with Google:');
      console.log('ID Token:', idToken);
      console.log('FCM Token:', fcmToken);

      dispatch({type: GOOGLE_LOGIN_REQUEST});

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post(
        `${serverApi}/auth/google`,
        {idToken, fcmToken},
        config,
      );

      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: GOOGLE_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const UserRegister =
//   (name, mobile, email, password) => async dispatch => {
//     try {
//       dispatch({type: REGISTER_USER_REQUEST});

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const {data} = await axios.post(
//         `${serverApi}/register`,
//         {name, mobile, password, email},
//         config,
//       );

//       dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});

//       return data;
//     } catch (error) {
//       console.error(
//         'Registration Error:',
//         error.response?.data || error.message,
//       );
//       dispatch({
//         type: REGISTER_USER_FAIL,
//         payload: error.response?.data?.message || 'Something went wrong',
//       });
//     }
//   };

export const verifyOtpAndRegisterUser =
  ({name, email, password, mobile, otp}) =>
  async dispatch => {
    try {
      dispatch({type: VERIFY_MOBILE_OTP_REQUEST});

      console.log('Registering new user with:', {name, email, mobile, otp});

      const {data} = await axios.post(`${serverApi}/verify-otp-register`, {
        name,
        email,
        password,
        mobile,
        otp,
      });

      if (data.success) {
        dispatch({
          type: VERIFY_MOBILE_OTP_SUCCESS,
          payload: data.user,
        });

        console.log('Registration + OTP success:', data.user);
        AsyncStorage.setItem('authToken', data.token);

        return {
          success: true,
          user: data.user,
          token: data.token,
          isRegistered: true,
        };
      } else {
        dispatch({
          type: VERIFY_MOBILE_OTP_FAIL,
          payload: data.message || 'OTP verification failed',
        });

        return {success: false, message: data.message};
      }
    } catch (error) {
      console.error('Error in verifyOtpAndRegisterUser:', error);

      const errorMessage =
        error.response?.data?.message || 'Something went wrong';

      dispatch({
        type: VERIFY_MOBILE_OTP_FAIL,
        payload: errorMessage,
      });

      return {success: false, message: errorMessage};
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

    return {success: true, user: data.user};
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_OTP_FAIL,
      payload: error.response?.data?.message || 'Failed to verify OTP',
    });
  }
};

export const VerifyOTPEmailForgot = (email, otp) => async dispatch => {
  try {
    dispatch({type: VERIFY_EMAIL_OTP_FORGOT_REQUEST});

    // Replace with actual API call
    const response = await axios.post(`${serverApi}/verify-email-otp`, {
      email,
      otp,
    });

    dispatch({
      type: VERIFY_EMAIL_OTP_FORGOT_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_OTP_FORGOT_FAIL,
      payload: error.response?.data?.message || 'Something went wrong',
    });
    return {success: false};
  }
};

export const resetPassword = (email, password) => async dispatch => {
  dispatch({type: RESET_PASSWORD_REQUEST});
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post(
      `${serverApi}/reset-password`,
      {email, password},
      config,
    );

    console.log('this is the response from action', data);

    dispatch({type: RESET_PASSWORD_SUCCESS, payload: data});
    return data;
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Something went wrong',
    });
    return {success: false};
  }
};

export const sendMobileOtp = mobileNumber => async dispatch => {
  try {
    dispatch({type: SEND_MOBILE_OTP_REQUEST});

    let formattedNumber = mobileNumber.trim();

    if (!formattedNumber.startsWith('+')) {
      formattedNumber = `+91${formattedNumber}`;
    }

    const {data} = await axios.post(`${serverApi}/send-otp`, {
      phoneNumber: formattedNumber,
    });

    dispatch({
      type: SEND_MOBILE_OTP_SUCCESS,
      payload: data.message,
    });

    return {success: true, message: data.message, formattedNumber};
  } catch (error) {
    console.error(
      'Error in sendMobileOtp:',
      error.response?.data || error.message,
    );

    const errorMessage = error.response?.data?.message || 'Failed to send OTP';

    dispatch({
      type: SEND_MOBILE_OTP_FAIL,
      payload: errorMessage,
    });

    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

export const VerifyMobileOtp = (mobileNumber, otp) => async dispatch => {
  try {
    dispatch({
      type: VERIFY_MOBILE_OTP_REQUEST,
    });

    const {data} = await axios.post(`${serverApi}/verify-otp`, {
      phoneNumber: mobileNumber,
      otp: otp,
    });

    if (data.success) {
      dispatch({
        type: VERIFY_MOBILE_OTP_SUCCESS,
        payload: data.user || null,
      });

      if (data.user) {
        console.log('User is already registered:', data.user);
        console.log('user after verification', data.user);

        AsyncStorage.setItem('authToken', data.token);
        return {
          success: true,
          user: data.user,
          token: data.token,
          isRegistered: !!data.user,
        };
      } else {
        console.log('User is not registered. Navigating to Signup.');
        return {success: true, isRegistered: false};
      }
    } else {
      dispatch({
        type: VERIFY_MOBILE_OTP_FAIL,
        payload: 'Invalid OTP. Please try again.',
      });

      return {success: false, message: 'Invalid OTP. Please try again.'};
    }
  } catch (error) {
    console.error('Error in verifying OTP:', error);

    const errorMessage =
      error.response?.data?.message ||
      'Error in verifying OTP. Please try again later.';

    dispatch({
      type: VERIFY_MOBILE_OTP_FAIL,
      payload: errorMessage,
    });

    return {success: false, message: errorMessage};
  }
};

export const addShippingInfo = (userId, address) => async dispatch => {
  if (!userId || !address) {
    console.error('Invalid userId or address:', userId, address);
    return;
  }

  try {
    dispatch({type: ADD_SHIPPING_INFO_REQUEST});

    console.log('Dispatching payload:', {userId, ...address}); // ✅ Log the payload

    const {data} = await axios.post(
      `${serverApi}/shippingInfo/add`,
      {
        userId: userId || '', // Fallback for null userId
        flatNo: address.flatNo || '', // Fallback for null values
        area: address.area || '',
        landmark: address.landmark || '',
        city: address.city || '',
        state: address.state || '',
        mobile: address.mobile || '',
        pincode: address.pincode || '',
        country: address.country || 'INDIA',
        type: address.type || 'Home',
        isDefault: address.isDefault ?? true, // Nullish coalescing operator
      },
      {withCredentials: true},
    );
    await AsyncStorage.setItem('formFilled', 'true');
    dispatch({
      type: ADD_SHIPPING_INFO_SUCCESS,
      payload: data.shippingInfo,
    });
  } catch (error) {
    console.error('Error adding shipping info:', error);
    dispatch({
      type: ADD_SHIPPING_INFO_FAIL,
      payload: error.response?.data?.message || 'Failed to add shipping info',
    });
  }
};

export const getShippingInfo = userId => async dispatch => {
  try {
    dispatch({type: GET_SHIPPING_INFO_REQUEST});

    const {data} = await axios.get(`${serverApi}/shippingInfo/${userId}`, {
      withCredentials: true,
    });

    const shippingInfo = data.shippingInfo || {addresses: []};

    dispatch({type: GET_SHIPPING_INFO_SUCCESS, payload: shippingInfo});
  } catch (error) {
    console.error('Error fetching shipping info:', error);

    dispatch({
      type: GET_SHIPPING_INFO_FAIL,
      payload: error.response?.data?.message || 'Failed to fetch shipping info',
    });

    dispatch({type: GET_SHIPPING_INFO_SUCCESS, payload: {addresses: []}}); // Reset on error
  }
};

export const editShippingInfo = (userId, address) => async dispatch => {
  try {
    dispatch({type: UPDATE_SHIPPING_INFO_REQUEST});

    // Prepare updated fields (skip undefined/null values optionally)
    const {
      flatNo,
      area,
      landmark,
      city,
      state,
      mobile,
      pincode,
      country,
      type,
      isDefault,
    } = address;

    const updatedFields = {
      flatNo,
      area,
      landmark,
      city,
      state,
      mobile,
      pincode,
      country,
      type,
      isDefault,
    };

    const {data} = await axios.put(`${serverApi}/shippingInfo/update`, {
      userId,
      addressId: address._id,
      updatedFields,
    });

    dispatch({
      type: UPDATE_SHIPPING_INFO_SUCCESS,
      payload: data.shippingInfo,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHIPPING_INFO_FAIL,
      payload:
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong',
    });
  }
};

export const updateUserInfo = (userId, updatedData) => async dispatch => {
  dispatch({type: UPDATE_USER_REQUEST});

  try {
    const {data} = await axios.put(`${serverApi}/edit/${userId}`, updatedData);

    await AsyncStorage.setItem('user', JSON.stringify(data.user));

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logoutUser = () => async dispatch => {
  await AsyncStorage.removeItem('user');

  dispatch({type: LOGOUT_USER_SUCCESS});

  // ✅ Reset the shipping info state to prevent stale data
  dispatch({type: GET_SHIPPING_INFO_SUCCESS, payload: null});
};
