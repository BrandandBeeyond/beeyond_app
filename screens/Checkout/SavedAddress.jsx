import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { globalStyle } from '../../assets/styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getShippingInfo } from '../../redux/actions/UserAction';

const SavedAddress = () => {
  const dispatch = useDispatch();
  const { loading, shippingInfo, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getShippingInfo());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme, globalStyle.alignCenter]}>
        <ActivityIndicator size="large" color="#f9b000" />
        <Text>Loading addresses...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme, globalStyle.alignCenter]}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View style={[globalStyle.my10, globalStyle.px10]}>
          <Text style={[globalStyle.medium, globalStyle.fw700]}>
            {shippingInfo?.length > 0
              ? `Delivery address (${shippingInfo.length})`
              : 'No saved addresses found'}
          </Text>

          {shippingInfo?.length > 0 ? (
            shippingInfo.map((address, index) => (
              <View
                key={index}
                style={[
                  globalStyle.cardOuter,
                  globalStyle.my15,
                  globalStyle.rounded3,
                ]}>
                <View style={[globalStyle.card, globalStyle.rounded3]}>
                  <Text style={[globalStyle.normalText, globalStyle.fw700]}>
                    {address?.fullName || 'N/A'}
                  </Text>
                  <View style={globalStyle.mt3}>
                    <Text style={globalStyle.normalText}>
                      {address.flatNo}, {address.area}
                    </Text>
                    <Text style={globalStyle.normalText}>
                      {address.landmark ? `${address.landmark},` : ''} {address.city}, {address.state}
                    </Text>
                    <Text style={globalStyle.normalText}>
                      {address.country} - {address.pincode}
                    </Text>
                    <Text style={globalStyle.normalText}>
                      Mobile: {address.mobile}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              No saved addresses yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedAddress;
