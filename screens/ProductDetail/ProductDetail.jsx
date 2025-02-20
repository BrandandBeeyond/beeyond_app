import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {ProductDetailStyle} from './Style';
import {productStyle} from '../Products/Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import DownArrow from 'react-native-vector-icons/AntDesign';
import BagIcon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {AddtoCart} from '../../redux/actions/CartAction';
import {AddNotification} from '../../redux/actions/NotificationAction';
import Notification from '../../components/Notification/Notification';

const ProductDetail = ({route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const {notifications} = useSelector(state => state.notifications);

  const {product} = route.params;
  const discount = Math.round(
    ((product.cuttedPrice - product.price) / product.cuttedPrice) * 100,
  );

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(AddNotification('Product added to cart'));

      setLoading(false);
      setAdded(true);
    }, 2500);
    dispatch(AddtoCart(product));
  };
  return (
    <SafeAreaView style={[globalStyle.bgTheme, globalStyle.flex]}>
      <ScrollView>
        <View style={globalStyle.bgWhite}>
          <View
            style={[
              globalStyle.py10,
              globalStyle.px10,
              globalStyle.dcol,
              globalStyle.g2,
            ]}>
            <Image
              source={product.thumbnail}
              style={ProductDetailStyle.wrapImage}
            />
            <Text style={ProductDetailStyle.titleProduct}>{product.title}</Text>
            <View
              style={[
                globalStyle.mt3,
                globalStyle.drow,
                globalStyle.cg5,
                globalStyle.alignCenter,
              ]}>
              <View style={ProductDetailStyle.ratings}>
                <Text style={productStyle.ratingText}>{product.ratings}</Text>
                <FontAwesomeIcon icon={faStar} color="#fff" size={10} />
              </View>
              <View>
                <Text style={[globalStyle.xsSmall, globalStyle.textSlate]}>
                  ({product.reviews} Reviews)
                </Text>
              </View>
            </View>

            <View style={globalStyle.mt10}>
              <View
                style={[
                  ProductDetailStyle.bgParrotGreen,
                  ProductDetailStyle.priceCard,
                ]}>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg3,
                  ]}>
                  <DownArrow name="arrowdown" size={16} color={'#000'} />
                  <Text style={ProductDetailStyle.discountprice}>
                    {discount} %
                  </Text>
                </View>
                <View>
                  <Text style={ProductDetailStyle.cuttedPrice}>
                    ₹{product.cuttedPrice}
                  </Text>
                </View>
                <View>
                  <Text style={ProductDetailStyle.price}>₹{product.price}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={ProductDetailStyle.stickyButtonContainer}>
        <Pressable
          style={[
            ProductDetailStyle.addtocart,
            added && ProductDetailStyle.addedToCart,
          ]}
          onPress={handleAddToCart}
          disabled={loading || added}>
          {loading ? (
            <ActivityIndicator size="small" color={'#111'} />
          ) : (
            <>
              <BagIcon
                name="shopping-bag"
                color={added ? '#fff' : '#111'}
                size={20}
              />
              <Text
                style={[
                  ProductDetailStyle.addtocartText,
                  added && ProductDetailStyle.addedCartText,
                ]}>
                {added ? 'Go' : 'Add'} to cart
              </Text>
            </>
          )}
        </Pressable>
        <Pressable style={ProductDetailStyle.buynow}>
          <Text style={ProductDetailStyle.buynowText}>Buy now</Text>
        </Pressable>
      </View>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          showCartButton={true}
        />
      ))}
    </SafeAreaView>
  );
};

export default ProductDetail;
