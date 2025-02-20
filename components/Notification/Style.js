import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/Scaling';
import {scale, verticalScale} from 'react-native-size-matters';

export const NotificationStyle = StyleSheet.create({
  notification: {
    backgroundColor: '#363636',
    padding: horizontalScale(12),
    position: 'absolute',
    top: verticalScale(4),
    left: horizontalScale(6),
    width: 380,
    borderRadius: horizontalScale(7),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notiText: {
    color: '#fff',
    fontSize: scaleFontSize(13),
  },
  ViewCart: {
    backgroundColor: '#8f8e8e',
    height: verticalScale(25),
    width: horizontalScale(80),
    borderRadius: horizontalScale(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewCartText: {
    fontSize: scaleFontSize(11),
    color: '#fff',
    fontWeight: '600',
  },
});
