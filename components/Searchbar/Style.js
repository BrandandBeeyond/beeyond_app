import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/Scaling';

export const SearchStyle = StyleSheet.create({
  searchInput: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(5),
  },
  searchInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderRadius: 10,
    paddingLeft: horizontalScale(10),
    paddingVertical: verticalScale(1),
  },
});
