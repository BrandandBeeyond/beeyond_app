import {horizontalScale, verticalScale} from '../../assets/styles/Scaling';

const {StyleSheet} = require('react-native');

export const CategoryStyle = StyleSheet.create({
  category: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  featured: {
    height: verticalScale(60),
    width: horizontalScale(67),
    backgroundColor: '#f3eee4',
    marginRight: horizontalScale(15),
    borderRadius: horizontalScale(120),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  featuredImg: {
    height: verticalScale(30),
    width: horizontalScale(30),
  },
  pr5: {
    paddingRight: horizontalScale(15),
  },
});
