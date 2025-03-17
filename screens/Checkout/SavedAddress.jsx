import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,

} from 'react-native';
import { globalStyle } from '../../assets/styles/globalStyle';


const SavedAddress = () => {

  return (
    <SafeAreaView style={[globalStyle.flex,globalStyle.bgTheme]}>
      <ScrollView>
          <View style={globalStyle.my10}>
              <Text style={globalStyle.contentHead}>Delivery address(1)</Text>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedAddress;
