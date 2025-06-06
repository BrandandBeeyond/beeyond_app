import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/CartConstants';

export const AddtoCart = product => (dispatch, getState) => {
  const {cart} = getState().cart;
  const exisitingItem = cart.find(item => item.id === product.id);

  if (exisitingItem) {
    dispatch({
      type: INCREMENT_QUANTITY,
      payload: product.id,
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      payload: {...product, quantity: 1, addedAt:Date.now()},
    });
  }
};

export const incrementQuantity = productId => dispatch => {
  dispatch({
    type: INCREMENT_QUANTITY,
    payload: productId,
  });
};
export const RemovefromCart = productId => dispatch => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
};
export const decrementQuantity = productId => dispatch => {
  dispatch({
    type: DECREMENT_QUANTITY,
    payload: productId,
  });
};





