import {configureStore} from '@reduxjs/toolkit';
import {ProductReducer} from './reducers/ProductReducer';
import {CartReducer} from './reducers/CartReducer';
import {thunk} from 'redux-thunk';
import {NotificationReducer} from './reducers/NotificationReducer';
import {UserReducer} from './reducers/UserReducer';

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    notifications: NotificationReducer,
    user: UserReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default store;
