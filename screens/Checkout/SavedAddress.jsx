import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {useSelector} from 'react-redux';

const SavedAddress = () => {
  const {user} = useSelector(state => state.user);
  const {shippingInfo} = useSelector(state => state.cart);

  
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View style={[globalStyle.my10, globalStyle.px10]}>
          <Text style={[globalStyle.medium, globalStyle.fw700]}>
            Delivery address (1)
          </Text>
          <View
            style={[
              globalStyle.cardOuter,
              globalStyle.my15,
              globalStyle.rounded3,
            ]}>
            <View style={[globalStyle.card, globalStyle.rounded3]}>
              <Text style={globalStyle.normalText}>{user.name}</Text>
              <View style={globalStyle.mt3}>
                <Text style={globalStyle.normalText}>{shippingInfo.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedAddress;
