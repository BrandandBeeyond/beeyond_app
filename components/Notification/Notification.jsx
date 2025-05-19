import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {NotificationStyle} from './Style';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../navigation/Routes';

const Notification = ({message, type = 'cart'}) => {
  const navigation = useNavigation();

  if (!message) {
    return null;
  }

  const handleNavigate = () => {
    if (type === 'cart') {
      navigation.navigate(Routes.Cart);
    } else if (type === 'wishlist') {
      navigation.navigate(Routes.Wishlist);
    }
  };
  return (
    <View style={NotificationStyle.notification}>
      <Text style={NotificationStyle.notiText}>{message}</Text>

      <Pressable style={NotificationStyle.ViewCart} onPress={handleNavigate}>
        <Text style={NotificationStyle.ViewCartText}>
          {type === 'cart' ? 'View Cart':'View Wishlist'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Notification;
