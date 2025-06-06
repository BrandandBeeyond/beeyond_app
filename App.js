import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {MainNavigation} from './navigation/mainNavigation';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {loadUser} from './redux/actions/UserAction';
import notifee from '@notifee/react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import Bootsplash from 'react-native-bootsplash';
import Splashscreen from './screens/Splashscreen/Splashscreen';

const AppContent = () => {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(true);
  const {cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    Bootsplash.hide({fade: true});

    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= 1) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    };

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    async function createNotificationChannel() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    }

    createNotificationChannel();
  }, []);

  useEffect(() => {
    const cartItemsForNotification = async () => {
      if (!cartItems || !cartItems.length === 0) return;

      const now = Date.now();

      const expiredItems = cartItems.filter(item => {
        if (!item.addedAt) return false;

        const elapsedHours = (now - item.addedAt) / (1000 * 60 * 60);
        return elapsedHours >= 12;
      });

      if (expiredItems.length > 0) {
        await notifee.displayNotification({
          title: 'Your Cart is Waiting 🛒',
          body: 'You still have items waiting in your cart. Complete your purchase now!',
          android: {
            channelId: 'default',
            pressAction: {id: 'default'},
          },
        });
      }
    };

    const delay = setTimeout(() => {
      cartItemsForNotification();
    }, 3000);

    return () => clearTimeout(delay);
  }, [cartItems]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <AlertNotificationRoot theme="dark">
      {showSplash ? (
        <Splashscreen />
      ) : (
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      )}
    </AlertNotificationRoot>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
