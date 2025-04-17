import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from "../constants/BellNotiConstatnts";


const initialState = {
  items: [],
};

export const BellNotiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        items: [action.payload, ...state.items], // newest on top
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
