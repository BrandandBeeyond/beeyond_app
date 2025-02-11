import React from 'react';
import {View} from 'react-native';
import Header from '../Header/Header';
import {mostbyStyle} from './Style';
import Products from './Products';

const Mostbuys = () => {
  return (
    <View style={mostbyStyle.mostbuys}>
      <Header type={3} title={'Most buys'} />
      <View style={mostbyStyle.wrapItems}>
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
      </View>
    </View>
  );
};

export default Mostbuys;
