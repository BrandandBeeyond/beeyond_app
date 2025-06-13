import React from 'react';
import {Image, View} from 'react-native';
import Header from '../Header/Header';
import {mostbyStyle} from './Style';


const Mostbuys = ({mostBuys}) => {
  return (
    <View style={mostbyStyle.mostbuys}>
      <Header type={3} title={'Most buys'} />
      <View style={mostbyStyle.wrapItems}>
        {mostBuys.map((item, index) => (
          <View key={index} style={mostbyStyle.thumbnail}>
            <View style={mostbyStyle.imageContainer}>
              <Image source={item.image} style={mostbyStyle.thumbnail} />
            </View>
          </View>
        ))}

      </View>
    </View>
  );
};

export default Mostbuys;
