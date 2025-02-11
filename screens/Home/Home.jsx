import React from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import Topbar from '../../components/Topbar/Topbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import {HomeStyle} from './Style';
import Categories from '../../components/Categories/Categories';
import Mostbuys from '../../components/Mostbuys/Mostbuys';
import LottieView from 'lottie-react-native';

const Home = ({navigation}) => {
  const categoryData = [
    {
      id: 1,
      title: 'Diaries',
      heroimage: require('../../assets/images/categories/diary.png'),
    },
    {
      id: 2,
      title: 'Journals',
      heroimage: require('../../assets/images/categories/journal.png'),
    },
    {
      id: 3,
      title: 'Gifts',
      heroimage: require('../../assets/images/categories/gift-box.png'),
    },
  ];

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
