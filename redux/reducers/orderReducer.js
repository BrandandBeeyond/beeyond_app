import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../constants/OrderConstants';

const initialState = {
  loading: false,
  order: null,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {...state, loading: true};

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        error: null,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
     return state;
  }
};
