import {configureStore} from '@reduxjs/toolkit';
import {ProductReducer} from './reducers/ProductReducer';
import {CartReducer} from './reducers/CartReducer';
import {thunk} from 'redux-thunk';
import {NotificationReducer} from './reducers/NotificationReducer';
import {UserReducer} from './reducers/UserReducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'cart'],
};

const persistedUserReducer = persistReducer(persistConfig, UserReducer);
const persistedCartReducer = persistReducer(persistConfig, CartReducer);

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: persistedCartReducer,
    notifications: NotificationReducer,
    user: persistedUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
