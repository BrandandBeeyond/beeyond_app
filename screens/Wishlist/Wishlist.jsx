import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CartStyle} from '../Cart/Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import { Routes } from '../../navigation/Routes';

const Wishlist = ({navigation}) => {
  const {isAuthenticated} = useSelector(state => state.user);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={CartStyle.userNoLoggedIn}>
          
          <View style={globalStyle.lottyani}>
            <LottieView
              style={{flex: 1}}
              source={require('./wishlist.json')}
              autoPlay
              loop
            />
          </View>
          <View style={[globalStyle.mt10, globalStyle.w100]}>
            <Text style={[globalStyle.subtext, globalStyle.textCenter,globalStyle.fwbold]}>
              Your Wishlist is Empty
            </Text>
            <Pressable
              style={CartStyle.mainBtn}
              onPress={() => navigation.navigate(Routes.Products)}>
              <View>
                <Text style={CartStyle.mainBtnText}>Continue shopping</Text>
              </View>
            </Pressable>

            {!isAuthenticated && (
              <View>
                <Pressable
                  onPress={() => navigation.navigate(Routes.EmailEntry)}>
                  <Text style={[globalStyle.warnText, globalStyle.textCenter]}>
                    SIGN IN NOW
                  </Text>
                </Pressable>
                <Text style={[globalStyle.textCenter, CartStyle.describe]}>
                  To see the items you added previously
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;
