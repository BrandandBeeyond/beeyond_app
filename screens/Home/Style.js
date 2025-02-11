import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/Scaling';

export const HomeStyle = StyleSheet.create({
  imageBanner: {
    height: 160,
    width: '100%',
    objectFit: 'cover',
    marginTop: verticalScale(20),
    borderRadius: horizontalScale(20),
  },
  slidebanner: {
    paddingHorizontal: horizontalScale(10),
  },
});
