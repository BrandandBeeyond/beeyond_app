import {horizontalScale, verticalScale} from '../../assets/styles/Scaling';

const {StyleSheet} = require('react-native');

export const mostbyStyle = StyleSheet.create({
  mostbuys: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  thumbnail: {
    height: verticalScale(80),
    width: horizontalScale(80),
    backgroundColor: '#c9c9c9',
    borderRadius: horizontalScale(20),
  },
  wrapItems: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(13),
    marginVertical: verticalScale(10),
  },
});
