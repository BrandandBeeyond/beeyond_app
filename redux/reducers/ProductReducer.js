import {FETCH_PRODUCTS_SUCCESS} from '../constants/ProductConstants';

const initalState = {
  products: [],
};

export const ProductReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
