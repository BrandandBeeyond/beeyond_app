import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/Scaling';
import {verticalScale} from 'react-native-size-matters';

export const checkOutStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Background color
    padding: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: scaleFontSize(14),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  input: {
    height: verticalScale(35),
    borderWidth: horizontalScale(0.8),
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: scaleFontSize(13),
    color: '#000',
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    color: '#999',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    backgroundColor: '#28A745',
    color: '#fff',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#4267B2',
    height: verticalScale(47),
    borderRadius: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  ChangePassword:{
    backgroundColor: '#4267B2',
    height: verticalScale(35),
    borderRadius: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  saveButtonText: {
    fontSize: scaleFontSize(15),
    fontWeight: '600',
    color: '#fff', // Disabled text color
  },
  errorText: {
    color: 'red',
    fontSize: scaleFontSize(12),
    marginTop: horizontalScale(4),
  },
  addmoreAddress: {
    backgroundColor: '#4267B2',
    height: verticalScale(25),
    borderRadius: horizontalScale(3),
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  addmoreAddressText: {
    color: '#ffffff',
    fontSize: scaleFontSize(12),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  addmoreAddInner: {
    background: 'transparent',
    borderWidth:horizontalScale(1.5),
    borderColor:'#4267B2',
    height: verticalScale(32),
    borderRadius: horizontalScale(7),
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:horizontalScale(10)
  },
  addmoreAddInnerText: {
    color: '#4267B2',
    fontSize: scaleFontSize(12),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
