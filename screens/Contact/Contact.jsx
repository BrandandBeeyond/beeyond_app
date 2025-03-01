import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import DocIcon from 'react-native-vector-icons/Ionicons';
import WhatsAppIcon from 'react-native-vector-icons/Ionicons';
import CallIcon from 'react-native-vector-icons/MaterialIcons';

const Contact = () => {
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View
          style={[
            globalStyle.px10,
            globalStyle.py10,
            globalStyle.relative,
            globalStyle.py10,
          ]}>
          <View
            style={[
              globalStyle.p8,
              globalStyle.bgWhite,
              globalStyle.normalBorder,
              globalStyle.rounded3,
            ]}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <View style={globalStyle.dcol}>
                <Text style={globalStyle.contentHead}>Contact us</Text>
                <Text style={[globalStyle.contnentPara, globalStyle.mt10]}>
                  {`Please get in touch with us in case you face \nany issues. we will happy to help you.`}
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../assets/images/contactvector.png')}
                  style={globalStyle.avatarContact}
                />
              </View>
            </View>
          </View>

          <View style={[globalStyle.my15]}>
            <Text style={[globalStyle.contnentPara, globalStyle.px2]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              est voluptatibus nam possimus voluptatum vitae? Error odio dolorem
              quaerat sint possimus praesentium ratione. Mollitia optio repellat
              nemo. Nemo, perferendis. Quae!
            </Text>
          </View>

          <View
            style={[
              globalStyle.bgWhite,
              globalStyle.normalBorder,
              globalStyle.rounded3,
              globalStyle.p5,
              globalStyle.mt15,
            ]}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <DocIcon name="document" size={20} color={'#000'} />
              <View style={globalStyle.dcol}>
                <Text style={globalStyle.contentHead}>FAQ</Text>
                <Text style={globalStyle.contnentPara}>
                  You can manage your orders in Orders section
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              globalStyle.bgWhite,
              globalStyle.normalBorder,
              globalStyle.rounded3,
              globalStyle.p5,
              globalStyle.mt15,
            ]}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <WhatsAppIcon name="logo-whatsapp" size={20} color={'#000'} />
              <View style={globalStyle.dcol}>
                <Text style={globalStyle.contentHead}>Need Assistance ?</Text>
                <Text style={globalStyle.contnentPara}>whatsApp us</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              globalStyle.bgWhite,
              globalStyle.normalBorder,
              globalStyle.rounded3,
              globalStyle.p5,
              globalStyle.mt15,
            ]}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <CallIcon name="call" size={20} color={'#000'} />
              <View style={globalStyle.dcol}>
                <Text style={globalStyle.contentHead}>
                  10:00 AM to 05:00 PM (Mon to Sat)
                </Text>
                <Text style={globalStyle.contnentPara}>+91 9876543210</Text>
              </View>
            </View>
          </View>
          <View style={[globalStyle.my20]}>
            <Text style={globalStyle.contentHead}>Our office addresses</Text>
          </View>
          <View
            style={[
              globalStyle.bgWhite,
              globalStyle.normalBorder,
              globalStyle.rounded3,
              globalStyle.p5,
            ]}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <View style={globalStyle.dcol}>
                <Text style={globalStyle.contentHead}>Nashik</Text>
                <Text style={globalStyle.contnentPara}>
                  Office No 12 Second Floor, Business Bay, Shree, Hari Kute
                  Marg, near Hotel Sandeep, Mumbai Naka, Matoshree Nagar,
                  Nashik, Maharashtra 422002
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;
