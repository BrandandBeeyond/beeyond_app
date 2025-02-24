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
import {useSelector} from 'react-redux';
import ArrowIcon from 'react-native-vector-icons/Entypo';
import CheckIcon from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {
  const {user, isAuthenticated} = useSelector(state => state.user);

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
          {isAuthenticated ? (
            <Pressable style={ProfileStyle.userAccount} onPress={()=>navigation.navigate(Routes.MyAccount)}>
              <View style={[globalStyle.drow, globalStyle.cg5, globalStyle.p5]}>
                <View style={globalStyle.avatar}>
                  <View style={globalStyle.avatarInner}>
                    <Image
                      source={require('../../assets/images/man.png')}
                      style={ProfileStyle.Profileimg}
                    />
                  </View>
                </View>
                <View style={[globalStyle.dcol]}>
                  <View
                    style={[
                      globalStyle.drow,
                      globalStyle.alignCenter,
                      globalStyle.justifyBetween,
                      globalStyle.relative,
                    ]}>
                    <View>
                      <Text style={globalStyle.userName}>{user.name}</Text>
                    </View>
                    <View style={globalStyle.rightarricon}>
                      <ArrowIcon
                        name="chevron-right"
                        size={22}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                  <View style={globalStyle.mt10}>
                    <View
                      style={[
                        globalStyle.drow,
                        globalStyle.alignCenter,
                        globalStyle.cg3,
                      ]}>
                      <View>
                        <CheckIcon
                          name="checkmark-circle-sharp"
                          color={'#F1F1F1'}
                          size={16}
                        />
                      </View>
                      <View>
                        <Text
                          style={[globalStyle.small, globalStyle.userdetail]}>
                          {user.email}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        globalStyle.drow,
                        globalStyle.alignCenter,
                        globalStyle.cg3,
                        globalStyle.mt5,
                      ]}>
                      <View>
                        <CheckIcon
                          name="checkmark-circle-sharp"
                          color={'#F1F1F1'}
                          size={16}
                        />
                      </View>
                      <View>
                        <Text
                          style={[globalStyle.small, globalStyle.userdetail]}>
                          +91-{user.mobile}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={() => navigation.navigate(Routes.EmailEntry)}>
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
          )}

          {!isAuthenticated && (
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
          )}
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
