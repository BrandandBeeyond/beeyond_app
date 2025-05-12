import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../../assets/styles/globalStyle';

const Privacypolicy = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[globalStyle.bgTheme, globalStyle.mx10]}>
          <View style={globalStyle.mt15}>
            <Text style={globalStyle.contentHead}>
              Your Privacy, Our Commitment
            </Text>
            <Text style={[globalStyle.small, globalStyle.mt10]}>
              At Beeyond, we value your trust. We are committed to protecting your personal information and
              ensuring a safe shopping experience.
            </Text>
          </View>

          <View style={globalStyle.mt15}>
            <Text style={globalStyle.contentHead}>Information We Collect:</Text>
            <Text style={globalStyle.small}>● Basic personal details (name, contact number, email address)</Text>
            <Text style={globalStyle.small}>● Shipping and billing information</Text>
            <Text style={globalStyle.small}>● Payment details (securely processed through trusted gateways)</Text>
          </View>

          <View style={globalStyle.mt15}>
            <Text style={globalStyle.contentHead}>How We Use It:</Text>
            <Text style={globalStyle.small}>● To process and deliver your orders</Text>
            <Text style={globalStyle.small}>● To provide updates, offers, and customer support</Text>
            <Text style={globalStyle.small}>● To improve your shopping experience on our app</Text>
          </View>

          <View style={globalStyle.mt15}>
            <Text style={globalStyle.contentHead}>What We Never Do:</Text>
            <Text style={globalStyle.small}>● We never sell, rent, or share your personal data with unauthorized third parties.</Text>
          </View>

          <View style={globalStyle.mt15}>
            <Text style={globalStyle.contentHead}>Data Security:</Text>
            <Text style={globalStyle.small}>● We use industry-standard encryption and secure servers to safeguard your information.</Text>
          </View>

          <View style={globalStyle.mt15}>
            <Text style={globalStyle.contentHead}>Your Rights:</Text>
            <Text style={globalStyle.small}>● You can update, access, or delete your personal information anytime by contacting us.</Text>
          </View>

          <View style={globalStyle.mt15}>
            <Text style={globalStyle.small}>
              For any privacy-related questions, please reach out to us at [privacy@beeyond.app]
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacypolicy;
