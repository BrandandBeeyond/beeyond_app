import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Uptrend from 'react-native-vector-icons/Feather';
import {SearchStyle} from '../../components/Searchbar/Style';
import {TextInput} from 'react-native-gesture-handler';
import {scaleFontSize} from '../../assets/styles/Scaling';

import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../redux/actions/ProductAction';

const Search = ({navigation}) => {
  const trendingSearches = [
    'Journals',
    'Dream Manifestation',
    'Happiness Journal',
    'Day Planning Journals',
    'Diaries',
    'Gratitude Journals',
  ];

  const {products} = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const searchInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    const trimmed = searchTerm.trim().toLowerCase();
    setSearchSubmitted(true);

    if (trimmed.length === 0) {
      setSearchResult(null);
      return;
    }

    const match = products.find(item => {
      const combinedText = `
      ${item.name}
      ${item.description}
      ${item.category}
      ${item.specifications?.map(s => JSON.stringify(s)).join(' ')}
    `.toLowerCase();


      return combinedText.includes(trimmed);
    });

    if (match) {
      setSearchResult(match);
      navigation.navigate('Products', {searchTerm: match});
    } else {
      setSearchResult(false);
    }

    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={[globalStyle.bgWhite, globalStyle.flex]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[globalStyle.my10]}>
          <View style={[SearchStyle.searchInput]}>
            <Pressable style={SearchStyle.searchInputContainer}>
              <BackIcon
                name="arrow-back"
                size={19}
                style={{color: '#000', opacity: 0.7}}
                onPress={() => navigation.goBack()}
              />
              <TextInput
                placeholder={`Search`}
                placeholderTextColor="#888"
                style={{flex: 1}}
                returnKeyType="search"
                ref={searchInputRef}
                onSubmitEditing={handleSearch}
                onChangeText={text => {
                  setSearchTerm(text);
                }}
              />
            </Pressable>
          </View>
        </View>

        <View style={[globalStyle.mt3, globalStyle.px10]}>
          <View
            style={[
              globalStyle.drow,
              globalStyle.cg5,
              globalStyle.alignCenter,
            ]}>
            <Uptrend
              name="trending-up"
              size={13}
              style={{color: '#000', opacity: 0.7}}
            />
            <Text style={[globalStyle.h6, globalStyle.fw700]}>
              Trending Searches
            </Text>
          </View>

          <View
            style={[
              globalStyle.drow,
              globalStyle.cg3,
              globalStyle.mt10,
              {flexWrap: 'wrap'},
            ]}>
            {trendingSearches.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#f0f0f0',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  marginRight: 8,
                  marginBottom: 8,
                }}>
                <Text style={{fontSize: scaleFontSize(12), color: '#333'}}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {searchSubmitted && searchResult === false && (
            <View style={[globalStyle.mt10]}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                No records found for "{searchTerm}"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
