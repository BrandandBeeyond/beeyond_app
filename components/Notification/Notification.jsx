import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {NotificationStyle} from './Style';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../navigation/Routes';

const Notification = ({message, showCartButton = false}) => {
  const navigation = useNavigation();

  if (!message) {
    return null;
  }
  return (
    <View style={NotificationStyle.notification}>
      <Text style={NotificationStyle.notiText}>{message}</Text>
      {showCartButton && (
        <Pressable
          style={NotificationStyle.ViewCart}
          onPress={() => navigation.navigate(Routes.Cart)}>
          <Text style={NotificationStyle.ViewCartText}>View Cart</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Notification;
