import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, TextInput, View} from 'react-native';
import { SearchStyle } from './Style';

const Searchbar = () => {
  return (
    <View style={SearchStyle.searchInput}>
      <Pressable style={SearchStyle.searchInputContainer}>
        <FontAwesomeIcon icon={faSearch} color={'#000'} style={{opacity:0.8}} />
        <TextInput placeholder="Search...." />
      </Pressable>
    </View>
  );
};

export default Searchbar;
