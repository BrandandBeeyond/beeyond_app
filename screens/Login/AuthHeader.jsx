import React from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/Header/Header';
import { globalStyle } from '../../assets/styles/globalStyle';
import { LoginStyle } from './Style';

const AuthHeader = ({title}) => {
  return (
    <View style={[LoginStyle.loginLayout]}>
      <Header title={title} type={1} color={'#0a0200'} />
      <View style={[globalStyle.mt10, globalStyle.mb20]}>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In inventore
          minima dolores.
        </Text>
      </View>
    </View>
  );
};

export default AuthHeader;
