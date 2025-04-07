import axios from 'axios';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../constants/OrderConstants';
import {serverApi} from '../../config/serverApi';
import { CLEAR_CART } from '../constants/CartConstants';

export const CreateOrder = orderData => async dispatch => {
  try {
    dispatch({type: CREATE_ORDER_REQUEST});

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post(`${serverApi}/create`, orderData, config);

    dispatch({type: CREATE_ORDER_SUCCESS, payload: data});

    dispatch({type:CLEAR_CART});
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrders = async dispatch => {
  try {
    dispatch({type: GET_ORDER_REQUEST});

    const {data} = await axios.get(`${serverApi}/orders/all`);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
