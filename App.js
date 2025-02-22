import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { MainNavigation } from './navigation/mainNavigation';
import { Provider, useDispatch } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { loadUser } from './redux/actions/UserAction';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
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
