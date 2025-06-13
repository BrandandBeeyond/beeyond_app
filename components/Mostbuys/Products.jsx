import React from 'react';
import {Image, View} from 'react-native';
import {mostbyStyle} from './Style';

const Products = ({mostBuys}) => {
  return (
    <View style={mostbyStyle.thumbnail}>
      <Image source={mostBuys.image} />
    </View>
  );
};

export default Products;
