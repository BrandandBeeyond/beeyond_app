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
    backgroundColor: '#D8D8D8', // Disabled button color
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0A0A0', // Disabled text color
  },
});
