import React, { useEffect } from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import Topbar from '../../components/Topbar/Topbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import {HomeStyle} from './Style';
import Categories from '../../components/Categories/Categories';
import Mostbuys from '../../components/Mostbuys/Mostbuys';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


const Home = ({navigation,route}) => {
  const categoryData = [
    {
      id: 1,
      title: 'Diaries',
      image: require('../../assets/images/categories/diary.png'),
    },
    {
      id: 2,
      title: 'Journals',
      image: require('../../assets/images/categories/journal.png'),
    },
    {
      id: 3,
      title: 'Gifts',
      image: require('../../assets/images/categories/gift-box.png'),
    },
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
            <Image
              source={require('../../assets/images/banner.jpg')}
              style={HomeStyle.imageBanner}
            />
          </View>

          <Categories categories={categoryData} />
          <Mostbuys />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
