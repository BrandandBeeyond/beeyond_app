import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/styles/Scaling';

export const HomeStyle = StyleSheet.create({
  imageBanner: {
    height: 220,
    width: '100%',
    objectFit: 'cover',
    marginTop: verticalScale(20),
    borderRadius: horizontalScale(20),
  },
  slidebanner: {
    paddingHorizontal: horizontalScale(10),
  },
  weofferSlab:{
    borderWidth:1,
    borderColor:'#8CAB8C',
    borderRadius:horizontalScale(10),
    padding:horizontalScale(5),
    marginVertical:verticalScale(20),
    backgroundColor:'#D1EED1',
  
  },
  smText:{
    fontSize:scaleFontSize(10.7),
    marginTop:verticalScale(-5)
  },
  offer1:{
    display:'flex',
    flexDirection:'row',
  }
});
