import axios from 'axios';
import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAIL,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
} from '../constants/PaymentConstants';
import {serverApi} from '../../config/serverApi';

export const createPaymentOrder = amount => async dispatch => {
  try {
    dispatch({type: PAYMENT_REQUEST});

    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const {data} = await axios.post(`${serverApi}/order`, {amount});

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: data.data,
    });

    return data.data;
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
      payload: error.response?.data?.message || 'Payment failed',
    });
  }
};

export const verifyPayment = paymentData => async dispatch => {
  try {
    dispatch({type: VERIFY_PAYMENT_REQUEST});

    const {data} = await axios.post(`${serverApi}/verifypayment`, paymentData);

    dispatch({
      type: VERIFY_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_PAYMENT_FAIL,
      payload: error.response?.data?.message || 'Verification failed',
    });
  }
};
