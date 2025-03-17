import {configureStore} from '@reduxjs/toolkit';
import {ProductReducer} from './reducers/ProductReducer';
import {CartReducer} from './reducers/CartReducer';
import {thunk} from 'redux-thunk';
import {NotificationReducer} from './reducers/NotificationReducer';
import {UserReducer} from './reducers/UserReducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WishlistReducer} from './reducers/WishlistReducer';

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistCartConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['cart', 'shippingInfo'],
};
const persistedUserReducer = persistReducer(persistUserConfig, UserReducer);
const persistedCartReducer = persistReducer(persistCartConfig, CartReducer);

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: persistedCartReducer,
    notifications: NotificationReducer,
    user: persistedUserReducer,
    wishlist: WishlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
