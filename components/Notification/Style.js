import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/styles/Scaling';

const SCREEN_WIDTH =  Dimensions.get('window').width;

export const NotificationStyle = StyleSheet.create({
  notification: {
    backgroundColor: '#363636',
    padding: horizontalScale(9),
    position: 'absolute',
    top: verticalScale(4),
    left: horizontalScale(6),
   width:SCREEN_WIDTH - horizontalScale(12),
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
