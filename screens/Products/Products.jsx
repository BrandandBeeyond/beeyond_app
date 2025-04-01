import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../../assets/styles/globalStyle';
import {productStyle} from './Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../redux/actions/ProductAction';
import {AddtoCart} from '../../redux/actions/CartAction';
import {INCREMENT_QUANTITY} from '../../redux/constants/CartConstants';
import Notification from '../../components/Notification/Notification';
import {AddNotification} from '../../redux/actions/NotificationAction';
import {useNavigation} from '@react-navigation/native';
import Hearticon from 'react-native-vector-icons/AntDesign';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {
  AddtoWishlist,
  RemoveFromWishlist,
} from '../../redux/actions/WishlistAction';
import {horizontalScale} from '../../assets/styles/Scaling';
import LottieView from 'lottie-react-native';

const Products = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(state => state.products);
  console.log('this are products', products);

  const {cart} = useSelector(state => state.cart);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {notifications} = useSelector(state => state.notifications);
  const {wishlist} = useSelector(state => state.wishlist);
  const navigation = useNavigation();

  const isIteminWishlist = product => {
    return wishlist.some(wishItem => wishItem.id === product.id);
  };
  console.log('checking wishlist', isIteminWishlist);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddtoCart = product => {
    setLoadingId(product.id);

    setTimeout(() => {
      const isProductInCart = cart.some(item => item.id === product.id);

      if (!isProductInCart) {
        setSelectedProduct(product);
        setModalVisible(true);
      } else {
        dispatch({
          type: INCREMENT_QUANTITY,
          payload: product.id,
        });
        dispatch(AddNotification('Product added to cart'));
      }

      setLoadingId(null);
    }, 2000);
  };

  const handleContinue = () => {
    if (selectedProduct) {
      dispatch(AddtoCart(selectedProduct));
      setModalVisible(false);
      dispatch(AddNotification('Product added to cart'));
    }
  };

  const handleAddtoWishlist = product => {
    try {
      if (isIteminWishlist(product)) {
        dispatch(RemoveFromWishlist(product.id));
        dispatch(AddNotification('Product removed from wishlist'));
      } else {
        dispatch(AddtoWishlist(product));
        dispatch(AddNotification('product added to wishlist'));
      }
    } catch (error) {
      console.error('unable to add product in wishlist');
    }
  };

  return (
    <SafeAreaView style={[globalStyle.bgTheme, globalStyle.flex]}>
      <ScrollView
        contentContainerStyle={productStyle.container}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <>
            <View style={globalStyle.mt20}>
              <LottieView
                style={{flex: 1}}
                source={require('./loader.json')}
                autoPlay
                loop
              />
            </View>
          </>
        ) : (
          <>
            {products.map((item, i) => (
              <View style={productStyle.productCard} key={i}>
                <View style={productStyle.productCardBody}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ProductDetail', {product: item})
                    }>
                    <View style={globalStyle.relative}>
                      <Image
                        source={{uri: item.images?.[0]?.url}}
                        style={productStyle.mockup}
                      />
                      <Pressable
                        style={productStyle.wishlistContainer}
                        onPress={() => handleAddtoWishlist(item)}>
                        <Hearticon
                          name={isIteminWishlist(item) ? 'heart' : 'hearto'}
                          color={isIteminWishlist(item) ? '#f35c6e' : '#000'}
                          size={17}
                        />
                      </Pressable>
                    </View>
                  </Pressable>
                  <View style={globalStyle.mt3}>
                    <View
                      style={[
                        globalStyle.drow,
                        globalStyle.g2,
                        globalStyle.alignCenter,
                      ]}>
                      <View style={productStyle.ratings}>
                        <Text style={productStyle.ratingText}>
                          {item.ratings}
                        </Text>
                        <FontAwesomeIcon icon={faStar} color="#fff" size={10} />
                      </View>
                      <View>
                        <Text
                          style={[globalStyle.xsSmall, globalStyle.textSlate]}>
                          ({item.reviews} Reviews)
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('ProductDetail', {product: item})
                      }>
                      <View style={globalStyle.mt3}>
                        <Text style={productStyle.title}>{item.name}</Text>
                        <View
                          style={[
                            globalStyle.drow,
                            globalStyle.alignCenter,
                            globalStyle.cg5,
                            globalStyle.mt3,
                          ]}>
                          <Text style={productStyle.cuttedPrice}>
                            ₹ {item.cuttedPrice}
                          </Text>
                        </View>
                        <Text style={productStyle.price}>₹ {item.price}</Text>
                      </View>
                    </Pressable>

                    <View style={globalStyle.mt10}>
                      <Pressable
                        style={productStyle.addtocart}
                        onPress={() => handleAddtoCart(item)}>
                        {loadingId === item.id ? (
                          <View
                            style={[
                              globalStyle.drow,
                              globalStyle.alignCenter,
                              globalStyle.cg3,
                            ]}>
                            <ActivityIndicator size="small" color={'#fff'} />
                            <Text style={globalStyle.textWhite}>
                              Add to cart
                            </Text>
                          </View>
                        ) : (
                          <Text style={globalStyle.textWhite}>Add to cart</Text>
                        )}
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={productStyle.modalOverlay}>
          <View style={productStyle.modalContent}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.justifyBetween,
                globalStyle.p5,
                globalStyle.bgSemiLight,
              ]}>
              <View>
                <Text style={[globalStyle.subtext, globalStyle.fwbold]}>
                  Add item to cart?
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <CloseIcon name="closecircle" size={20} />
              </Pressable>
            </View>
            {selectedProduct && (
              <>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.cg5,
                    globalStyle.p8,
                    globalStyle.mt5,
                  ]}>
                  <View>
                    <Image
                      source={{uri: selectedProduct?.images?.[0]?.url}}
                      style={productStyle.modalImage}
                    />
                  </View>

                  <View style={[globalStyle.w100, {flex: 1}]}>
                    <Text style={productStyle.modalTitle}>
                      {selectedProduct.name}
                    </Text>
                    <Text
                      style={[
                        globalStyle.subtext,
                        globalStyle.mt5,
                        globalStyle.textCenter,
                        {flexWrap: 'wrap'},
                      ]}>
                      {selectedProduct.description}
                    </Text>
                    <Text style={productStyle.modalPrice}>
                      ₹ {selectedProduct.price}
                    </Text>
                  </View>
                </View>

                <View style={{margin: horizontalScale(8)}}>
                  <Pressable
                    style={productStyle.continueBtn}
                    onPress={handleContinue}>
                    <Text style={globalStyle.textWhite}>Continue</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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

export default Products;
