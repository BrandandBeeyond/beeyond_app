import {scale, verticalScale} from 'react-native-size-matters';
import {horizontalScale, scaleFontSize} from '../../assets/styles/Scaling';

const {StyleSheet} = require('react-native');

export const ProductDetailStyle = StyleSheet.create({
  wrapImage: {
    width: '100%',
    height: verticalScale(250),
  },
  titleProduct: {
    fontSize: scaleFontSize(16),
    color: '#111',
    fontWeight: '500',
  },
  ratings: {
    backgroundColor: '#108934',
    height: verticalScale(20),
    width: horizontalScale(35),
    paddingVertical: verticalScale(3),
    paddingHorizontal: horizontalScale(5),
    borderRadius: horizontalScale(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(5),
  },
  label: {
    backgroundColor: '#111',
    height: verticalScale(25),
    width: '60',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: '#fff',
    fontSize: scaleFontSize(13),
    fontWeight: '600',
  },
  bgParrotGreen: {
    backgroundColor: '#f8f398',
  },
  priceCard: {
    height: verticalScale(42),
    width: '100%',
    borderRadius: horizontalScale(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(20),
    padding: horizontalScale(10),
  },
  discountprice: {
    fontSize: scaleFontSize(16),
    color: '#000',
  },
  cuttedPrice: {
    fontSize: scaleFontSize(16),
    textDecorationLine: 'line-through',
    color: '#35495e',
    fontWeight: '600',
  },
  price: {
    fontSize: scaleFontSize(16),
    color: '#000',
    fontWeight: '600',
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    columnGap: horizontalScale(10),
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addtocart: {
    borderWidth: horizontalScale(1),
    borderColor: '#111',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: horizontalScale(8),
    paddingVertical: verticalScale(10),
    borderRadius: horizontalScale(50),
  },
  buynow: {
    backgroundColor: '#f9b000',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: horizontalScale(8),
    borderRadius: horizontalScale(50),
    paddingVertical: verticalScale(10),
  },
  buynowText: {
    color: '#fff',
    fontSize: scaleFontSize(16),
  },
  addtocartText: {
    color: '#111',
    fontSize: scaleFontSize(16),
  },
  addedToCart: {
    backgroundColor: '#111',
  },
  addedCartText: {
    color: '#fff',
  },
  
});
