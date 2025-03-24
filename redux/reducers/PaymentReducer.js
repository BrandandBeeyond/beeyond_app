import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAIL,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
} from '../constants/PaymentConstants';

const initialState = {
  loading: false,
  order: null,
  error: null,
  verification: null,
};

export const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case PAYMENT_FAIL:
      return {...state, loading: false, error: action.payload};

    case VERIFY_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        verification: action.payload,
      };
    case VERIFY_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
