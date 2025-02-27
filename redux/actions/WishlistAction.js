import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../constants/WishlistConstants';

export const AddtoWishlist = product => {
  return {
    type: ADD_TO_WISHLIST,
    payload: product,
  };
};

export const RemoveFromWishlist = productId => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: productId,
  };
};
