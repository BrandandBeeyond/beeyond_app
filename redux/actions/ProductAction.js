import axios from 'axios';
import {
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../constants/ProductConstants';
import {serverApi} from '../../config/serverApi';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({type: FETCH_PRODUCTS_REQUEST});

    const {data} = await axios.get(`${serverApi}/products`);

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.response?.data.message || 'Something went wrong',
    });
  }
};

// static
// export const fetchProducts = () => {
//   return {
//     type: FETCH_PRODUCTS_SUCCESS,
//     payload: ProductData,
//   };
// };
