import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { globalStyle } from '../../assets/styles/globalStyle';
import { checkOutStyle } from './Style';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import RadioIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/Routes';
import { getShippingInfo } from '../../redux/actions/UserAction';
import EditIcon from 'react-native-vector-icons/Feather';

const SelectAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  
  const { shippingInfo, user } = useSelector(state => state.user);

 
  const addresses =  shippingInfo.addresses;

  const [selectedIndex, setSelectedIndex] = useState(null);

 
  useEffect(() => {
    if (user) {
      dispatch(getShippingInfo(user._id));
    }
  }, [dispatch, user]);

  // Auto-select first address if exists
  useEffect(() => {
    if (Array.isArray(addresses) && addresses.length > 0 && selectedIndex === null) {
      setSelectedIndex(0);
    }
  }, [addresses, selectedIndex]);

  // Continue button handler
  const handleContinue = () => {
    if (selectedIndex !== null && addresses[selectedIndex]) {
      navigation.navigate(Routes.SavedAddress, {
        selectedAddress: addresses[selectedIndex],
      });
    } else {
      console.log('No address selected');
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={[globalStyle.my20, globalStyle.px10]}>

          {/* Add new address */}
          <Pressable
            style={checkOutStyle.addmoreAddInner}
            onPress={() => navigation.navigate(Routes.Checkoutform)}>
            <PlusIcon name="pluscircleo" color={'#4267B2'} size={20} />
            <Text style={checkOutStyle.addmoreAddInnerText}>
              Add New Delivery Address
            </Text>
          </Pressable>

          {/* Address List */}
          <View style={globalStyle.my20}>
            {addresses.length === 0 ? (
              <Text>No addresses available</Text>
            ) : (
              addresses.map((address, index) => (
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
                      overflow: 'hidden',
                    },
                  ]}>
                  <View style={[globalStyle.card, globalStyle.drow, globalStyle.itemsStart]}>
                    <RadioIcon
                      name={selectedIndex === index ? 'dot-circle-o' : 'circle-o'}
                      size={22}
                      color={selectedIndex === index ? '#4267B2' : '#999'}
                      style={{ marginRight: 10, marginTop: 4 }}
                    />
                    <View style={checkOutStyle.editAddress}>
                        <Pressable  onPress={() => navigation.navigate(Routes.Checkoutform, {addressToEdit: address })}>
                            <EditIcon name="edit" size={20} color="#4267B2" />
                        </Pressable>
                    </View>

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
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      {addresses.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 20,
            right: 20,
            backgroundColor: '#4267B2',
            borderRadius: 8,
          }}>
          <Pressable onPress={handleContinue}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                paddingVertical: 15,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Continue
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SelectAddress;
