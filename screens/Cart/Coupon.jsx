import React, {useEffect, useRef} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {SearchStyle} from '../../components/Searchbar/Style';
import { CartStyle } from './Style';
import { Image } from 'react-native';
import DiscountIcon from '../../assets/images/icons/discount.png';

const Coupon = () => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgWhite]}>
      <ScrollView style={[globalStyle.px10]}>
        <View
          style={[globalStyle.drow, globalStyle.alignCenter, globalStyle.cg5,globalStyle.mt15]}>
          <Pressable style={SearchStyle.flexInputcontainer}>
            <TextInput
              placeholder={`Enter Coupon Code`}
              placeholderTextColor="#888"
              style={{flex: 1}}
              returnKeyType="search"
              ref={searchInputRef}
            />
          </Pressable>

          <Pressable style={CartStyle.applycoupon}>
            <Text style={[CartStyle.applycouponText]}>Apply</Text>
          </Pressable>
        </View>

        <View style={[globalStyle.mt30,CartStyle.offersec]}>
           <Image source={DiscountIcon}/>
           <Text style={[globalStyle.h6,globalStyle.fw700,globalStyle.textGray,globalStyle.mt10]}>No Coupons Available</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Coupon;
