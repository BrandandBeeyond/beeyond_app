import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigation} from './navigation/mainNavigation';
import {CartProvider} from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
