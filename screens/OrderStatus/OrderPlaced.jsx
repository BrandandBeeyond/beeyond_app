import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';

const OrderPlaced = () => {
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <View
        style={[
          globalStyle.justifyCenter,
          globalStyle.dflex,
          globalStyle.alignCenter,
          globalStyle.mt40
        ]}>
        <View style={[globalStyle.lottyani]}>
          <LottieView
            style={{flex: 1}}
            source={require('./ordersuccess.json')}
            autoPlay
            loop
          />
        </View>
        <View
          style={[
            globalStyle.px10,
            globalStyle.justifyCenter,
            globalStyle.alignCenter,
          ]}>
          <Text style={globalStyle.fs1}>Order Confirmed</Text>
          <View style={globalStyle.mt30}>
            <Text style={[globalStyle.orderText, globalStyle.textCenter,globalStyle.px2]}>
              Thank you for your order. You will receive email confirmation
              shortly.
            </Text>
          </View>
          <View style={globalStyle.mt30}>
            <Text style={[globalStyle.orderText, globalStyle.textCenter,globalStyle.px2]}>
            Check the status of your order on the Order tracking page
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderPlaced;
