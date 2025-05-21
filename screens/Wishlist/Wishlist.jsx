import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {CartStyle} from '../Cart/Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';
import {Routes} from '../../navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import HeartIcon from 'react-native-vector-icons/Ionicons';
import {RemoveFromWishlist} from '../../redux/actions/WishlistAction';
import { verticalScale } from 'react-native-size-matters';

const Wishlist = ({navigation}) => {
  const {wishlist} = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      {wishlist.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {wishlist.map((item, i) => (
            <View
              key={i}
              style={[
                globalStyle.mx10,
                globalStyle.py10,
                globalStyle.bgWhite,
                globalStyle.mt10,
                globalStyle.px10,
                globalStyle.rounded3,
                globalStyle.dcol,
                {position: 'relative'},
              ]}>
              <View
                style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}>
                <Pressable
                  onPress={() => dispatch(RemoveFromWishlist(item.id))}>
                  <HeartIcon name="heart" size={20} color="#f35c6e" />
                </Pressable>
              </View>

              {/* Wishlist Item Info */}
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg5,
                ]}>
                <Image
                  source={{uri: item.images?.[0]?.url}}
                  style={[CartStyle.cartProd, globalStyle.rounded3]}
                />
                <View style={globalStyle.dcol}>
                  <View style={globalStyle.small}>
                    <Text style={globalStyle.fw700}>{item.name}</Text>
                    <View style={{flex: 1}}>
                      <Text
                        style={[globalStyle.normalText,globalStyle.mt10, {flexWrap: 'wrap'}]} numberOfLines={5}
    ellipsizeMode="tail">
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
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
            <Text
              style={[
                globalStyle.subtext,
                globalStyle.textCenter,
                globalStyle.fwbold,
              ]}>
              Your Wishlist is Empty!
            </Text>
            <Text
              style={[
                globalStyle.normalText,
                globalStyle.textCenter,
                globalStyle.mt10,
              ]}>
              Explore more & shortlist your favourite items!
            </Text>

            <Pressable
              style={CartStyle.mainBtn}
              onPress={() => navigation.navigate(Routes.Products)}>
              <View>
                <Text style={CartStyle.mainBtnText}>Continue Shopping</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Wishlist;
