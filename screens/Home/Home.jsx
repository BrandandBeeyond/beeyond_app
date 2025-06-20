import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import Topbar from '../../components/Topbar/Topbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import {HomeStyle} from './Style';
import Categories from '../../components/Categories/Categories';
import Mostbuys from '../../components/Mostbuys/Mostbuys';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Swiper from 'react-native-swiper';
import CheckIcon from 'react-native-vector-icons/Ionicons';
import StockIcon from 'react-native-vector-icons/Feather';
import HappyIcon from 'react-native-vector-icons/Entypo';

const Home = ({navigation, route}) => {
  const categoryData = [
    {
      id: 1,
      title: 'Diaries',
      image: require('../../assets/images/categories/diary.png'),
      url: 'NoRecords',
    },
    {
      id: 2,
      title: 'Journals',
      image: require('../../assets/images/categories/journal.png'),
      url: 'Products',
    },
    {
      id: 3,
      title: 'Gifts',
      image: require('../../assets/images/categories/gift-box.png'),
      url: 'NoRecords',
    },
  ];

  const mostBuys = [
    {
      id: 1,
      image: require('../../assets/images/dream_mani.jpg'),
      url: 'ProductDetail',
    },
    {
      id: 1,
      image: require('../../assets/images/golden_chronicles.jpeg'),
      url: 'NoRecords',
    },
  ];

  const bannerData = [
    require('../../assets/images/banner.jpg'),
    require('../../assets/images/banner2.jpg'),
    require('../../assets/images/banner3.jpg'),
  ];


  useEffect(() => {
    if (route.params?.showToast) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Otp verified Successfully...Signed in!',
        autoClose: 3000,
        title: '',
        theme: 'dark',
        containerStyle: {
          height: 20,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: '#1c1c1e',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 4,
          elevation: 5,
        },
        textBodyStyle: {
          color: '#ffffff',
          fontSize: 14,
          fontWeight: '500',
        },
      });
    }
  }, [route.params]);

  return (
    <SafeAreaView style={[globalStyle.bgWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Topbar navigation={navigation} />
          <Searchbar />
          <View style={HomeStyle.slidebanner}>
            <Swiper
              autoplay={true}
              showsPagination={true}
              autoplayTimeout={3}
              height={300}
              dot={
                <View
                  style={{
                    backgroundColor: '#ccc',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 3,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: '#f9b000',
                    width: 40,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 3,
                  }}
                />
              }>
              {bannerData.map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  style={HomeStyle.imageBanner}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
          </View>

          <View
            style={[
              HomeStyle.weofferSlab,
              globalStyle.mx10,
              globalStyle.drow,
              globalStyle.alignCenter,
              globalStyle.justifyBetween,
            ]}>
            <View
              style={[
                HomeStyle.offer1,
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <CheckIcon name="shield-checkmark-outline" size={20} />
              <View style={globalStyle.dcol}>
                <Text style={[globalStyle.h6, globalStyle.fw700]}>100%</Text>
                <Text style={HomeStyle.smText}>Original products</Text>
              </View>
            </View>
            <View
              style={[
                HomeStyle.offer1,
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <StockIcon name="box" size={20} />
              <View style={globalStyle.dcol}>
                <Text style={[globalStyle.h6, globalStyle.fw700]}>300 +</Text>
                <Text style={HomeStyle.smText}>Orders Delivered</Text>
              </View>
            </View>
            <View
              style={[
                HomeStyle.offer1,
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
              ]}>
              <HappyIcon name="emoji-happy" size={18} />
              <View style={globalStyle.dcol}>
                <Text style={[globalStyle.h6, globalStyle.fw700]}>200 +</Text>
                <Text style={HomeStyle.smText}>Happy Customers</Text>
              </View>
            </View>
          </View>

          <Categories categories={categoryData} navigation={navigation} />
          <Mostbuys mostBuys={mostBuys}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
