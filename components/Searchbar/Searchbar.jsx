import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, TextInput, View} from 'react-native';
import { SearchStyle } from './Style';
import SearchIcon from 'react-native-vector-icons/Feather';

const Searchbar = () => {
  return (
    <View style={SearchStyle.searchInput}>
      <Pressable style={SearchStyle.searchInputContainer}>
         <SearchIcon name="search" size={22} style={{color:'#000',opacity:0.8}} />
        <TextInput placeholder="Search...." />
      </Pressable>
    </View>
  );
};

export default Searchbar;
