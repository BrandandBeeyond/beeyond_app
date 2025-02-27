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
import {useSelector} from 'react-redux';
import {productStyle} from '../Products/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const Wishlist = ({navigation}) => {
  const {wishlist} = useSelector(state => state.wishlist);

  return (
    <SafeAreaView>
      {wishlist.length > 0 ? (
        <ScrollView>
          {wishlist.map((item, i) => (
            <View
              style={[
                globalStyle.mx10,
                globalStyle.py10,
                globalStyle.bgWhite,
                globalStyle.mt10,
                globalStyle.px10,
                globalStyle.rounded3,
                globalStyle.dcol,
              ]}>
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg5,
                ]}>
                <Image source={item.thumbnail} style={CartStyle.modalImage} />
                <View style={globalStyle.dcol}>
                  <View style={[productStyle.ratings, globalStyle.inline]}>
                    <Text style={productStyle.ratingText}>{item.ratings}</Text>
                    <FontAwesomeIcon icon={faStar} color={'#fff'} size={9} />
                  </View>
                  <View style={globalStyle.small}>
                    <Text>{item.title}</Text>
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
