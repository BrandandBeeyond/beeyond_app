import {FETCH_PRODUCTS_SUCCESS} from '../constants/ProductConstants';
import {ProductData} from '../data/productsData';

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: ProductData,
  };
};
