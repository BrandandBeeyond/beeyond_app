import {
  CANCEL_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../constants/OrderConstants';

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
      return {...state, loading: true};

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        error: null,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map(order =>
          order._id === action.payload.order._id
            ? {...order, orderStatus: 'Cancelled'}
            : order,
        ),
        error: null,
      };

    case CREATE_ORDER_FAIL:
    case GET_ORDER_FAIL:
    case CANCEL_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    
    default:
      return state;
  }
};
