import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../constants/WishlistConstants';

const initialState = {
  wishlist: [],
};

export const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const exists = state.wishlist.some(item => item.id === action.payload.id);

      if (exists) return state;
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};
