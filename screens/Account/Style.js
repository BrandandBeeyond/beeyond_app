import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/Scaling';

export const accountStyle = StyleSheet.create({
  profileBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    height: verticalScale(25),
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(5),
    marginTop: verticalScale(10),
  },
  profileBtnText: {
    color: '#fff',
    paddingHorizontal: horizontalScale(10),
    fontSize: scaleFontSize(11),
  },
  editableBtn: {
    backgroundColor: '#f4e7cb',
    width: 'auto',
    height: verticalScale(25),
    paddingHorizontal: horizontalScale(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(6),
  },
  editableText: {
    color: '#f9b000',
    fontSize: scaleFontSize(12),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  utilText: {
    color: '#111',
    fontSize: scaleFontSize(12),
    fontWeight: '600',
  },
});
