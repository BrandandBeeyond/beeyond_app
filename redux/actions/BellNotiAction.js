import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from "../constants/BellNotiConstatnts";


export const addNotification = notification => dispatch => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      ...notification,
      date: new Date().toISOString(), // optional: auto-append timestamp
    },
  });
};

export const clearNotifications = () => dispatch => {
  dispatch({
    type: CLEAR_NOTIFICATIONS,
  });
};
