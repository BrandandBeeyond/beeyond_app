import axios from 'axios';
import {
  SEND_ORDER_NOTIFICATION_REQUEST,
  SEND_ORDER_NOTIFICATION_SUCCESS,
} from '../constants/OrderNotificationConstants';
import {serverApi} from '../../config/serverApi';

export const SendEmailNotification = payload => async dispatch => {
  try {
    dispatch({type: SEND_ORDER_NOTIFICATION_REQUEST});

    const {data} = await axios.post(`${serverApi}/sendmailsms`, payload);

    dispatch({
      type: SEND_ORDER_NOTIFICATION_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'SEND_ORDER_NOTIFICATION_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};
