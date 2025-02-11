import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Header from '../Header/Header';
import {CategoryStyle} from './Style';
import PropTypes from 'prop-types';
import { globalStyle } from '../../assets/styles/globalStyle';

const Categories = ({categories}) => {
  return (
    <View style={CategoryStyle.category}>
      <Header type={3} title={'Featured categories'} />

      <FlatList
        horizontal={true}
        data={categories}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View >
            <View style={CategoryStyle.featured}>
              <Image
                source={item.heroimage}
                style={CategoryStyle.featuredImg}
              />
            </View>
            <Text style={[globalStyle.textCenter,CategoryStyle.pr5,globalStyle.textsmall]}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string,
};

export default Categories;
