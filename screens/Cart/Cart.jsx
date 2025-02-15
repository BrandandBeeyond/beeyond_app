import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';
import {CartStyle} from './Style';
import {Routes} from '../../navigation/Routes';
import {useCart} from '../../context/CartContext';
import Promocode from 'react-native-vector-icons/MaterialCommunityIcons';
import TrashIcon from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/Feather';
import DownArrowIcon from 'react-native-vector-icons/Entypo';

const Cart = ({navigation}) => {
  const {cart} = useCart();
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      {cart.length > 0 ? (
        <ScrollView>
          <View
            style={[
              globalStyle.bgWhite,
              globalStyle.drow,
              globalStyle.alignCenter,
              globalStyle.cg5,
              globalStyle.py10,
              globalStyle.mt20,
              globalStyle.mx10,
              globalStyle.px10,
              globalStyle.rounded3,
            ]}>
            <Promocode name="label-percent" color={'#f35c6e'} size={25} />
            <Text style={[globalStyle.subtext, globalStyle.fw700]}>
              Apply Coupon
            </Text>
          </View>

          {cart.map((item, index) => (
            <View key={index}
              style={[
                globalStyle.mx10,
                globalStyle.py10,
                globalStyle.bgWhite,
                globalStyle.mt20,
                globalStyle.px10,
                globalStyle.rounded3,
                globalStyle.dcol,
              ]}>
              <View style={[globalStyle.drow, globalStyle.cg5]}>
                <Image
                  source={item.thumbnail}
                  style={[CartStyle.cartProd, globalStyle.rounded3]}
                />
                <View>
                  <Text style={globalStyle.medium}>{item.title}</Text>
                  <View style={[CartStyle.cartAddPrice]}>
                    <View>
                      <Text style={[globalStyle.small, CartStyle.cuttedPrice]}>
                        ₹ {item.cuttedPrice}
                      </Text>
                    </View>
                    <View>
                      <Text style={CartStyle.price}>₹ {item.price}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  globalStyle.mt10,
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg5,
                ]}>
                <Text style={globalStyle.small}>Qty</Text>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.justifyBetween,
                    globalStyle.cg20,
                  ]}>
                  <View style={[globalStyle.drow, globalStyle.cg3]}>
                    <Pressable style={CartStyle.cartTrash}>
                      <TrashIcon name="trash" color={'#555'} size={15} />
                    </Pressable>
                    <KeyboardAvoidingView behavior="padding">
                      <View style={CartStyle.itemCount}>
                        <Text>1</Text>
                      </View>
                    </KeyboardAvoidingView>
                    <Pressable style={CartStyle.cartTrash}>
                      <PlusIcon name="plus" color={'#555'} size={15} />
                    </Pressable>
                  </View>

                  <View style={[globalStyle.drow, globalStyle.alignCenter]}>
                    <View style={globalStyle.dcol}>
                      <Text style={CartStyle.itemTotalAmount}>₹ 200</Text>
                      <Text style={globalStyle.xsSmall}>price details</Text>
                    </View>
                    <View>
                      <DownArrowIcon name="chevron-small-down" size={22} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
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
              <Pressable
                style={CartStyle.mainBtn}
                onPress={() => navigation.navigate(Routes.Products)}>
                <View>
                  <Text style={CartStyle.mainBtnText}>Continue shopping</Text>
                </View>
              </Pressable>

              <View>
                <Pressable onPress={() => navigation.navigate(Routes.Login)}>
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
      )}
    </SafeAreaView>
  );
};

export default Cart;
