import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_CART_ITEM,
} from '../constants/CartConstants';

const initialState = {
  cart: [],
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload
              ? {...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      };

    default:
      return state;
  }
};
