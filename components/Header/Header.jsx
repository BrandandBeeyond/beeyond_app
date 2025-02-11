import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import {HeaderStyle} from './Style';

const Header = props => {
  const StyleToApply = () => {
    switch (props.type) {
      case 1:
        return HeaderStyle.title1;
      case 2:
        return HeaderStyle.title2;
      case 3:
        return HeaderStyle.title3;
      case 4:
        return HeaderStyle.title4;
      default:
        return HeaderStyle.title1;
    }
  };

  return (
    <View>
      <Text style={[StyleToApply(),props.color && {color:props.color}]}>{props.title}</Text>
    </View>
  );
};

Header.default = {
  title: '',
  type: 1,
  color: '#000',
};

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  color: PropTypes.string,
};

export default Header;
