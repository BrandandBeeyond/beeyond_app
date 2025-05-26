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
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Hearticon from 'react-native-vector-icons/AntDesign';
import {
  AddtoWishlist,
  RemoveFromWishlist,
} from '../../redux/actions/WishlistAction';

const ProductDetail = ({route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const {notifications} = useSelector(state => state.notifications);
  const navigation = useNavigation();
  const {product} = route.params;
  const {wishlist} = useSelector(state => state.wishlist);

  const discount = Math.round(
    ((product.cuttedPrice - product.price) / product.cuttedPrice) * 100,
  );

  const isIteminWishlist = product => {
    return wishlist.some(wishItem => wishItem.id === product.id);
  };

  const handleWishlistToggle = () => {
    if (isIteminWishlist(product)) {
      dispatch(RemoveFromWishlist(product.id));
      dispatch(AddNotification('Product removed from wishlist', 'wishlist'));
    } else {
      dispatch(AddtoWishlist(product));
      dispatch(AddNotification('Product added to wishlist', 'wishlist'));
    }
  };

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(AddNotification('Product added to cart'));

      setLoading(false);
      setAdded(true);
    }, 2500);
    dispatch(AddtoCart(product));
  };

  const goTocart = () => {
    navigation.navigate('Cart');
  };
  return (
    <SafeAreaView style={[globalStyle.bgTheme, globalStyle.flex]}>
      <ScrollView scrollEnabled={true}>
        <View style={globalStyle.bgWhite}>
          <View
            style={[
              globalStyle.py10,
              globalStyle.px10,
              globalStyle.dcol,
              globalStyle.g2,
            ]}>
            <Swiper
              autoplay={true}
              showsPagination={true}
              autoplayTimeout={3}
              height={250}
              dot={
                <View
                  style={{
                    backgroundColor: '#ccc',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 3,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 3,
                  }}
                />
              }>
              {product?.images?.map(img => (
                <Image
                  source={{uri: img.url}}
                  key={img.id}
                  style={ProductDetailStyle.wrapImage}
                />
              ))}
            </Swiper>

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

        <View style={globalStyle.mt10}>
          <View
            style={[globalStyle.bgWhite, globalStyle.px10, globalStyle.py10]}>
            <Text
              style={[
                globalStyle.h2,
                {
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.5,
                  paddingBottom: 8,
                  fontWeight: '600',
                },
              ]}>
              About this product
            </Text>

            <View style={globalStyle.mt10}>
              <Text style={globalStyle.h6}>{product.description}</Text>

              <View style={[globalStyle.dcol, globalStyle.mb80]}>
                <View style={[globalStyle.drow]}>
                  <Text style={[globalStyle.h6, globalStyle.fw700]}>
                    Category :
                  </Text>
                  <Text style={[globalStyle.h6]}> {product.category}</Text>
                </View>
                <View style={globalStyle.dcol}>
                  {product.specifications.map((spec, index) => (
                    <Text style={[globalStyle.h6]}>• {spec.description}</Text>
                  ))}
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
          onPress={added ? goTocart : handleAddToCart}
          disabled={loading}>
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
        <Pressable
          style={[
            ProductDetailStyle.buynow,
            isIteminWishlist(product) && {backgroundColor: '#ccc'}, // greyed out
          ]}
          onPress={handleWishlistToggle}
          disabled={isIteminWishlist(product)}>
          <Hearticon
            name={isIteminWishlist(product) ? 'heart' : 'hearto'}
            color={'#fff'}
            size={17}
          />
          <Text style={ProductDetailStyle.buynowText}>
            {isIteminWishlist(product) ? 'Wishlisted' : 'Wishlist'}
          </Text>
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
