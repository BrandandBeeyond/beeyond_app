import {configureStore} from '@reduxjs/toolkit';
import {ProductReducer} from './reducers/ProductReducer';
import {CartReducer} from './reducers/CartReducer';
import {thunk} from 'redux-thunk';
import {NotificationReducer} from './reducers/NotificationReducer';
import {UserReducer} from './reducers/UserReducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WishlistReducer} from './reducers/WishlistReducer';
import {PaymentReducer} from './reducers/PaymentReducer';
import {orderReducer} from './reducers/orderReducer';
import {OrderNotificationReducer} from './reducers/OrderNotificationReducer';
import {BellNotiReducer} from './reducers/BellNotiReducer';
import expireReducer from 'redux-persist-transform-expire';


const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user', 'shippingInfo'],
};

const persistCartConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['cart'],
};

const persistWishlistConfig = {
  key: 'wishlist',
  storage: AsyncStorage,
  whitelist: ['wishlist'],
};
const persistBellNotiConfig = {
  key: 'bellnotifications',
  storage: AsyncStorage,
  transforms: [
    expireReducer('bellnotifications', {
      expireSeconds: 86400,
      expiredState: [],
      autoExpire: true,
    }),
  ],
};
const persistedUserReducer = persistReducer(persistUserConfig, UserReducer);
const persistedCartReducer = persistReducer(persistCartConfig, CartReducer);
const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  WishlistReducer,
);
const persistedBellNotiReducer = persistReducer(
  persistBellNotiConfig,
  BellNotiReducer,
);

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: persistedCartReducer,
    notifications: NotificationReducer,
    user: persistedUserReducer,
    wishlist: persistedWishlistReducer,
    payment: PaymentReducer,
    orders: orderReducer,
    orderNotification: OrderNotificationReducer,
    bellnotifications: persistedBellNotiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
