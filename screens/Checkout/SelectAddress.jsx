import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { globalStyle } from '../../assets/styles/globalStyle';
import { checkOutStyle } from './Style';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import RadioIcon from 'react-native-vector-icons/FontAwesome'; // or Ionicons/MaterialIcons
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/Routes';

const SelectAddress = () => {
  const navigation = useNavigation();
  const { shippingInfo, user } = useSelector(state => state.user);
  const addresses = shippingInfo?.addresses || [];

  const [selectedIndex, setSelectedIndex] = useState(null); // for radio selection

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View style={[globalStyle.my20, globalStyle.px10]}>
          
          {/* Add new address */}
          <Pressable
            style={checkOutStyle.addmoreAddInner}
            onPress={() => navigation.navigate(Routes.Checkoutform)}>
            <PlusIcon name="pluscircleo" color={'#4267B2'} size={20} />
            <Text style={checkOutStyle.addmoreAddInnerText}>
              Add Delivery Address
            </Text>
          </Pressable>

          {/* Address List */}
          <View style={globalStyle.my20}>
            {addresses.map((address, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedIndex(index)}
                style={[
                  globalStyle.cardOuter,
                  globalStyle.my15,
                  globalStyle.rounded3,
                  {
                    borderColor: selectedIndex === index ? '#4267B2' : '#ccc',
                    borderWidth: 1.5,
                    overflow:'hidden'
                  },
                ]}>
                <View style={[globalStyle.card, globalStyle.drow, globalStyle.itemsStart]}>
                  
                  {/* Radio Icon */}
                  <RadioIcon
                    name={selectedIndex === index ? 'dot-circle-o' : 'circle-o'}
                    size={22}
                    color={selectedIndex === index ? '#4267B2' : '#999'}
                    style={{ marginRight: 10, marginTop: 4 }}
                  />

                  {/* Address Info */}
                  <View style={{ flex: 1 }}>
                    <Text style={[globalStyle.normalText, globalStyle.fw700]}>
                      {user?.name || 'N/A'}
                    </Text>
                    <View style={globalStyle.mt3}>
                      <Text style={globalStyle.xsSmall}>
                        {address.flatNo}, {address.area}
                      </Text>
                      <Text style={globalStyle.xsSmall}>
                        {address.landmark ? `${address.landmark},` : ''}{' '}
                        {address.city}, {address.state}
                      </Text>
                      <Text style={globalStyle.xsSmall}>
                        {address.country} - {address.pincode}
                      </Text>
                      <Text style={globalStyle.xsSmall}>
                        Mobile: {address.mobile}
                      </Text>
                    </View>
                  </View>

                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectAddress;
