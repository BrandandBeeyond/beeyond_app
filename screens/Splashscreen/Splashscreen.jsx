import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';

const Splashscreen = () => {
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgWhite,globalStyle.justifyCenter,globalStyle.alignCenter]}>
      <LottieView
        style={{width: 150, height: 150}}
        source={require('./splashscreen.json')}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default Splashscreen;
