import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {TopbarStyle} from './Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faCircleUser,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import {globalStyle} from '../../assets/styles/globalStyle';
import {Routes} from '../../navigation/Routes';

import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

const Topbar = ({navigation}) => {
  return (
    <View style={TopbarStyle.topbar}>
      <View style={TopbarStyle.topbarInner}>
        <Pressable onPress={() => navigation.navigate(Routes.Profile)}>
          <View style={TopbarStyle.row}>
            <FontAwesomeIcon icon={faCircleUser} size={20} />
            <View style={globalStyle.vertical}>
              <Text style={globalStyle.small}>Hello,</Text>
              <Text style={globalStyle.HelloText}>Join us!</Text>
            </View>
          </View>
        </Pressable>

        <View style={TopbarStyle.rightIcons}>
          <FontAwesomeIcon icon={faHeart} size={20} />
          <FontAwesomeIcon icon={faBell} size={20} />
          <Pressable onPress={() => navigation.navigate(Routes.Cart)}>
            <FontAwesomeIcon icon={faCartShopping} size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Topbar;
