import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../../assets/styles/globalStyle';

const Privacypolicy = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[globalStyle.bgTheme, globalStyle.mx10]}>
          
          <View style={globalStyle.mt15}>
            <Text style={globalStyle.small}>
              At Beeyond, we value your trust. We are committed to protecting
              your personal information and ensuring a safe shopping experience.
            </Text>
          </View>
          <View style={globalStyle.mt10}>
              <Text style={globalStyle.contentHead}>Hello</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacypolicy;
