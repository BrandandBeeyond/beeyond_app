import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/CartConstants';

const initialState = {
  cart: [],
  shippingInfo: {},
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
