import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const Cart = ({ width = 25, height = 25, fill = '#000' }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
      >
        <G>
          <Path
            d="M58.8 9.8c-.5-.6-1.3-.9-2-.9h-41l-.3-3.1c-.1-1.6-1.5-2.8-3.1-2.8h-7c-.6 0-1 .4-1 1s.4 1 1 1h7c.5 0 1 .4 1.1 1l2.5 30.3h-1.8c-3.9 0-7 3.1-7 7s3.1 7 7 7h4.9c-1.1 1.1-1.7 2.7-1.7 4.4 0 3.5 2.9 6.4 6.4 6.4s6.4-2.9 6.4-6.4c0-1.7-.7-3.2-1.7-4.4h16.7c-1.1 1.1-1.7 2.7-1.7 4.4 0 3.5 2.9 6.4 6.4 6.4s6.4-2.9 6.4-6.4-2.9-6.4-6.4-6.4H14.2c-2.8 0-5-2.2-5-5s2.2-5 5-5h40.1c1.4 0 2.6-1.1 2.7-2.5l2.4-23.9c.1-.8-.2-1.6-.7-2.1zM28.1 54.6c0 2.4-2 4.4-4.4 4.4s-4.4-2-4.4-4.4 2-4.4 4.4-4.4 4.4 2 4.4 4.4zm26 0c0 2.4-2 4.4-4.4 4.4s-4.4-2-4.4-4.4 2-4.4 4.4-4.4 4.4 2 4.4 4.4zm1-19c0 .4-.4.7-.8.7H12c-.4 0-.8-.3-.8-.7l-2.1-25.4h40.9c.2 0 .4.1.6.2.1.2.2.4.2.6z"
            fill={fill}
          />
          <Path
            d="M36.8 15.4c-1.7 0-3.1 1.4-3.1 3.1v10.3c0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V18.5c-.1-1.7-1.4-3.1-3.1-3.1zm1 13.3c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1V18.4c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1z"
            fill={fill}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
