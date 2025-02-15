import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/Scaling';
import {verticalScale} from 'react-native-size-matters';

export const productStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: horizontalScale(8),
    marginBottom: verticalScale(15),
    borderRadius: horizontalScale(6),
    borderWidth: 0.8,
    borderColor: '#ccc',
  },
  productCardBody: {
    flexDirection: 'column',
    rowGap: verticalScale(10),
    flex:1,
    justifyContent:'space-between'
  },
  mockup: {
    height: verticalScale(140),
    width: '100%',
    borderRadius: horizontalScale(6),
    objectFit: 'cover',
  },
  ratings: {
    backgroundColor: '#108934',
    height: 'auto',
    width: 'auto',
    paddingVertical: verticalScale(3),
    paddingHorizontal:horizontalScale(5),
    borderRadius: horizontalScale(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(5),
  },
  ratingText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: scaleFontSize(10),
  },
  title: {
    fontSize: scaleFontSize(13),
    fontWeight: '400',
    color: '#010101',
  },
  cuttedPrice: {
    fontSize: scaleFontSize(10),
    textDecorationLine: 'line-through',
    color: '#888',
  },
  price: {
    fontSize: 14,
    color: '#010101',
  },
  addtocart: {
    height: verticalScale(25),
    width: '100%',
    backgroundColor: '#f9b000',
    display: 'flex',
    justifyContent: 'center',
    borderRadius:horizontalScale(6),
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  modalPrice: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginVertical: 5,
  },
  continueBtn: {
    backgroundColor: '#f9b000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  
});
