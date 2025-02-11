import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {ProfileStyle} from './Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronCircleRight,
  faCircleInfo,
  faCircleQuestion,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import {faHeadphones} from '@fortawesome/free-solid-svg-icons/faHeadphones';
import {faShareNodes} from '@fortawesome/free-solid-svg-icons/faShareNodes';
import {Routes} from '../../navigation/Routes';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.bgTheme, globalStyle.flex]}>
      <ScrollView>
        <View
          style={[
            globalStyle.px10,
            globalStyle.py10,
            globalStyle.relative,
            globalStyle.bgWhite,
            globalStyle.py10,
          ]}>
          <Pressable onPress={() => navigation.navigate(Routes.Login)}>
            <Image
              source={require('../../assets/images/profilebann.jpg')}
              style={[ProfileStyle.profileBanner, globalStyle.shadowSm]}
            />
            <View style={ProfileStyle.profileBannerText}>
              <Header type={3} title={'Login / signup'} />
              <Text style={globalStyle.subtext}>Get amazing offers</Text>
              <View style={ProfileStyle.chevron}>
                <FontAwesomeIcon
                  color={'#444242'}
                  icon={faChevronCircleRight}
                  size={22}
                />
              </View>
            </View>
          </Pressable>

          <View style={[globalStyle.px10]}>
            <Text
              style={[
                globalStyle.textCenter,
                globalStyle.xsSmall,
                globalStyle.pt10,
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              animi vero iure.
            </Text>
          </View>
        </View>

        <View style={globalStyle.px10}>
          <View
            style={[
              ProfileStyle.rounded10,
              globalStyle.mt20,
              globalStyle.bgWhite,
              globalStyle.normalBorder,
            ]}>
            <View style={[ProfileStyle.faq, ProfileStyle.brbtm]}>
              <FontAwesomeIcon
                color={'#444242'}
                icon={faCircleQuestion}
                size={16}
              />
              <Text style={ProfileStyle.faqText}>FAQ's</Text>
            </View>

            <View style={ProfileStyle.faq}>
              <FontAwesomeIcon
                color={'#444242'}
                icon={faHeadphones}
                size={16}
              />
              <Text style={ProfileStyle.faqText}>Customer support</Text>
            </View>
          </View>
          <View
            style={[
              ProfileStyle.rounded10,
              globalStyle.mt20,
              globalStyle.bgWhite,
              globalStyle.normalBorder,
            ]}>
            <View style={[ProfileStyle.faq, ProfileStyle.brbtm]}>
              <FontAwesomeIcon
                color={'#444242'}
                icon={faShareNodes}
                size={16}
              />
              <Text style={ProfileStyle.faqText}>Share app</Text>
            </View>

            <View style={[ProfileStyle.faq, ProfileStyle.brbtm]}>
              <FontAwesomeIcon
                color={'#444242'}
                icon={faCircleInfo}
                size={16}
              />
              <Text style={ProfileStyle.faqText}>About us</Text>
            </View>

            <View style={ProfileStyle.faq}>
              <FontAwesomeIcon color={'#444242'} icon={faShield} size={16} />
              <Text style={ProfileStyle.faqText}>privacy policy</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
