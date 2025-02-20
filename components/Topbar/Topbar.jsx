import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {TopbarStyle} from './Style';
import {globalStyle} from '../../assets/styles/globalStyle';
import {Routes} from '../../navigation/Routes';
import CartIcon from 'react-native-vector-icons/Feather';
import BellIcon from 'react-native-vector-icons/Feather';
import HeartIcon from 'react-native-vector-icons/Feather';
import ProfileIcon from 'react-native-vector-icons/FontAwesome6';
import {CartStyle} from '../../screens/Cart/Style';
import {scaleFontSize} from '../../assets/styles/Scaling';
import {useSelector} from 'react-redux';

const Topbar = ({navigation}) => {
  const {cart} = useSelector(state => state.cart);
  const {isAuthenticated, user} = useSelector(state => state.user);

  return (
    <View style={TopbarStyle.topbar}>
      <View style={TopbarStyle.topbarInner}>
        <Pressable onPress={() => navigation.navigate(Routes.Profile)}>
          <View style={TopbarStyle.row}>
            <ProfileIcon name="circle-user" size={20} />
            <View style={globalStyle.vertical}>
              <Text style={globalStyle.small}>Hello,</Text>
              {isAuthenticated ? (
                <>
                <Text style={globalStyle.HelloText}>{user.name}</Text>
                </>
              ) : (
                <Text style={globalStyle.HelloText}>Join us!</Text>
              )}
            </View>
          </View>
        </Pressable>

        <View style={TopbarStyle.rightIcons}>
          <HeartIcon name="heart" size={20} />
          <BellIcon name="bell" size={20} />
          <Pressable
            onPress={() => navigation.navigate(Routes.Cart)}
            style={globalStyle.relative}>
            <CartIcon name="shopping-bag" size={20} />
            {cart.length > 0 && (
              <View style={CartStyle.CountCart}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: scaleFontSize(10),
                    fontWeight: 'bold',
                  }}>
                  {cart.length}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Topbar;
