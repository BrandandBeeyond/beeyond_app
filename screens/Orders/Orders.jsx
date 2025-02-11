import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {OrderStyle} from './Style';
import LottieView from 'lottie-react-native';
import { Routes } from '../../navigation/Routes';

const Orders = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View style={OrderStyle.userNoLoggedIn}>
          <View style={globalStyle.lottyani}>
            <LottieView
              style={{flex: 1}}
              source={require('./noorders.json')}
              autoPlay
              loop
            />
          </View>
          <View style={[globalStyle.mt10, globalStyle.w100]}>
            <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
              please login to view your orders
            </Text>
            <Pressable style={OrderStyle.mainBtn} onPress={()=>navigation.navigate(Routes.Login)}>
              <View>
                <Text style={OrderStyle.mainBtnText}>login now</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
