import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';

const NoRecords = () => {
  return (
    <SafeAreaView
      style={[
        [
          globalStyle.flex,
          globalStyle.bgWhite,
          globalStyle.justifyCenter,
          globalStyle.alignCenter,
          globalStyle.dcol
        ],
      ]}>
      <LottieView
        style={{width: 150, height: 150}}
        source={require('../Splashscreen/splashscreen.json')}
        autoPlay
        loop
      />
      <Text style={[globalStyle.h4,globalStyle.fw700]}>Coming soon</Text>
    </SafeAreaView>
  );
};

export default NoRecords;
