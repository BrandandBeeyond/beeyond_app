import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/Scaling';

export const ProfileStyle = StyleSheet.create({
  profileBanner: {
    height: verticalScale(80),
    width: horizontalScale('100%'),
    borderRadius: horizontalScale(20),
  },
  profileBannerText: {
    position: 'absolute',
    top: verticalScale(20),
    left: horizontalScale(30),
  },
  chevron: {
    position: 'absolute',
    top: verticalScale(17),
    left: horizontalScale(260),
  },
  rounded10: {
    borderRadius: horizontalScale(10),
  },
  faq: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: horizontalScale(10),
    padding: horizontalScale(12),
  },
  faqText: {
    fontSize: scaleFontSize(14),
    lineHeight: verticalScale(17),
    textTransform: 'capitalize',
  },
  brbtm: {
    borderBottomWidth: horizontalScale(0.18),
    borderColor: '#ccc',
  },
});
