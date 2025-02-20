import {
  ADD_NOTIFICATIONS,
  REMOVE_NOTIFICATIONS,
} from '../constants/NotificationConstants';

const initialState = {
  notifications: [],
};

export const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case REMOVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload,
        ),
      };

    default:
      return state;
  }
};
