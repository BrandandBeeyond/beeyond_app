import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {MainNavigation} from './navigation/mainNavigation';
import {Provider, useDispatch} from 'react-redux';
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
useEffect(() => {
    Bootsplash.hide({ fade: true });

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
