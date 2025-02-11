import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';
import {CartStyle} from './Style';

const Cart = () => {
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View style={CartStyle.userNoLoggedIn}>
          <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
            No items in your cart
          </Text>
          <View style={globalStyle.lottyani}>
            <LottieView
              style={{flex: 1}}
              source={require('./nocart.json')}
              autoPlay
              loop
            />
          </View>
          <View style={[globalStyle.mt10, globalStyle.w100]}>
            <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
              Let's add some items
            </Text>
            <Pressable style={CartStyle.mainBtn}>
              <View>
                <Text style={CartStyle.mainBtnText}>Continue shopping</Text>
              </View>
            </Pressable>

            <View>
              <Pressable>
                <Text style={[globalStyle.warnText, globalStyle.textCenter]}>
                  SIGN IN NOW
                </Text>
              </Pressable>
              <Text style={[globalStyle.textCenter, CartStyle.describe]}>
                To see the items you added previously
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
