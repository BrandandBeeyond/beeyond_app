import {
  SEND_ORDER_NOTIFICATION_FAIL,
  SEND_ORDER_NOTIFICATION_REQUEST,
  SEND_ORDER_NOTIFICATION_SUCCESS,
} from '../constants/OrderNotificationConstants';

const initialState = {
  loading: false,
  error: null,
  message: null,
  success: false,
};

export const OrderNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_NOTIFICATION_REQUEST:
      return {...state, loading: true};

    case SEND_ORDER_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };

    case SEND_ORDER_NOTIFICATION_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
