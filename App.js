import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigation} from './navigation/mainNavigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
