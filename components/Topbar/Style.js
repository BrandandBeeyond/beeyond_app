import {horizontalScale, verticalScale} from '../../assets/styles/Scaling';

const {StyleSheet} = require('react-native');

export const TopbarStyle = StyleSheet.create({
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(10),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
  },
  topbarInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  rightIcons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 20,
    marginRight: 8,
  },
});
