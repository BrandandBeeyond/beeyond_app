import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import LottieView from 'lottie-react-native';
import {CartStyle} from './Style';
import {Routes} from '../../navigation/Routes';
import Promocode from 'react-native-vector-icons/MaterialCommunityIcons';
import TrashIcon from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/Feather';
import DownArrowIcon from 'react-native-vector-icons/Entypo';
import MinusIcon from 'react-native-vector-icons/Entypo';
import InfoIcon from 'react-native-vector-icons/Foundation';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  RemovefromCart,
} from '../../redux/actions/CartAction';
import Notification from '../../components/Notification/Notification';

import Header from '../../components/Header/Header';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {getShippingInfo} from '../../redux/actions/UserAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import {
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
import {AddtoWishlist} from '../../redux/actions/WishlistAction';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart);
  const {wishlist} = useSelector(state => state.wishlist);

  const {isAuthenticated, shippingInfo, user} = useSelector(
    state => state.user,
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const alreadyInWishlist = wishlist.some(
    item => item.id === selectedProduct?.id,
  );

  const CalculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = total => {
    return (total * 18) / 100;
  };

  const calculateShipping = () => {
    return cart.length > 0 ? 50 : 0;
  };

  const totalAmount = CalculateCartTotal();
  const gstAmount = calculateGST(totalAmount);
  const shippingCharges = calculateShipping();
  const platformFee = 9;

  const checkoutAmount =
    totalAmount + gstAmount + shippingCharges + platformFee;

  useEffect(() => {
    if (isAuthenticated && user && user._id) {
      dispatch(getShippingInfo(user._id)); // Fetch shipping info on login
    }
  }, [dispatch, isAuthenticated, user]);

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && user && user._id) {
        dispatch(getShippingInfo(user._id)); // Refetch on navigation
      }
    }, [dispatch, isAuthenticated, user]),
  );
  const handleCheckOutNavigation = () => {
    console.log('Shipping Info (Redux):', shippingInfo);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (!isAuthenticated) {
        navigation.navigate(Routes.EmailEntry);
      }
   
      else if (shippingInfo?.addresses?.length > 0) {
        const selectedAddress = shippingInfo?.addresses[0];
        navigation.navigate(Routes.SavedAddress, {selectedAddress});
      } else {
        navigation.navigate(Routes.Checkoutform);
      }
    }, 2000);
  };

  const handleRemoveFromCart = product => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const confirmRemove = () => {
    if (selectedProduct) {
      dispatch(RemovefromCart(selectedProduct.id));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Cart quantity updated successfully!',
        autoClose: 3000, // Auto close in 3 seconds
        title: '', // No title
        theme: 'dark', // Force dark theme
        containerStyle: {
          height: 20,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: '#1c1c1e', // Dark background
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 4,
          elevation: 5,
        },
        textBodyStyle: {
          color: '#ffffff', // White text
          fontSize: 14,
          fontWeight: '500',
        },
      });
      setModalVisible(false);
    }
  };

  const handleIncrementQuantity = productId => {
    setLoadingSpinner(true);

    setTimeout(() => {
      dispatch(incrementQuantity(productId));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Cart quantity updated successfully!',
        autoClose: 3000, // Auto close in 3 seconds
        title: '', // No title
        theme: 'dark', // Force dark theme
        containerStyle: {
          height: 20,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: '#1c1c1e', // Dark background
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 4,
          elevation: 5,
        },
        textBodyStyle: {
          color: '#ffffff', // White text
          fontSize: 14,
          fontWeight: '500',
        },
      });

      setLoadingSpinner(false);
    }, 1000);
  };

  const handleDecrementQuantity = productId => {
    setLoadingSpinner(true);

    setTimeout(() => {
      dispatch(decrementQuantity(productId));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Cart quantity updated successfully!',
        autoClose: 3000, // Auto close in 3 seconds
        title: '', // No title
        theme: 'dark', // Force dark theme
        containerStyle: {
          height: 20,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: '#1c1c1e', // Dark background
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 4,
          elevation: 5,
        },
        textBodyStyle: {
          color: '#ffffff', // White text
          fontSize: 14,
          fontWeight: '500',
        },
      });
      setLoadingSpinner(false);
    }, 1000);
  };

  const handleWishListAddCartRemove = () => {
    if (selectedProduct) {
      dispatch(AddtoWishlist(selectedProduct));
      dispatch(RemovefromCart(selectedProduct.id));

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Moved to wishlist successfully!',
        autoClose: 3000,
        theme: 'dark',
        containerStyle: {
          height: 20,
          paddingVertical: 5,
          borderRadius: 8,
          backgroundColor: '#1c1c1e',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        },
        textBodyStyle: {
          color: '#ffffff',
          fontSize: 14,
          fontWeight: '500',
        },
      });

      setModalVisible(false);
      setSelectedProduct(null);
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <Spinner visible={loadingSpinner} />
      {cart.length > 0 ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable
            onPress={() => navigation.navigate(Routes.Coupon)}
              style={[
                globalStyle.bgWhite,
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg5,
                globalStyle.py10,
                globalStyle.mt20,
                globalStyle.mx10,
                globalStyle.px10,
                globalStyle.rounded3,
              ]}>
              <Promocode name="label-percent" color={'#f35c6e'} size={25} />
              <Text style={[globalStyle.subtext, globalStyle.fw700]}>
                Apply Coupon
              </Text>
            </Pressable>

            <Notification />

            {cart.map((item, index) => (
              <View
                key={index}
                style={[
                  globalStyle.mx10,
                  globalStyle.py10,
                  globalStyle.bgWhite,
                  globalStyle.mt20,
                  globalStyle.px10,
                  globalStyle.rounded3,
                  globalStyle.dcol,
                ]}>
                <View style={[globalStyle.drow, globalStyle.cg5]}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate(Routes.ProductDetail, {
                        product: item,
                      })
                    }>
                    <Image
                      source={{uri: item.images?.[0]?.url}}
                      style={[CartStyle.cartProd, globalStyle.rounded3]}
                    />
                  </Pressable>

                  <View>
                    <Text style={globalStyle.medium}>{item.name}</Text>
                    <View style={[CartStyle.cartAddPrice]}>
                      <View>
                        <Text
                          style={[globalStyle.small, CartStyle.cuttedPrice]}>
                          ₹ {item.cuttedPrice}
                        </Text>
                      </View>
                      <View>
                        <Text style={CartStyle.price}>₹ {item.price}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    globalStyle.mt10,
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg5,
                  ]}>
                  <Text style={globalStyle.small}>Qty</Text>
                  <View
                    style={[
                      globalStyle.drow,
                      globalStyle.alignCenter,
                      globalStyle.justifyBetween,
                      globalStyle.cg20,
                    ]}>
                    <View style={[globalStyle.drow, globalStyle.cg3]}>
                      {item.quantity === 1 ? (
                        <Pressable
                          style={CartStyle.cartTrash}
                          onPress={() => handleRemoveFromCart(item)}>
                          <TrashIcon name="trash" color={'#555'} size={15} />
                        </Pressable>
                      ) : (
                        <Pressable
                          style={CartStyle.cartTrash}
                          onPress={() => handleDecrementQuantity(item.id)}>
                          <MinusIcon name="minus" color={'#555'} size={15} />
                        </Pressable>
                      )}
                      <KeyboardAvoidingView behavior="padding">
                        <View style={CartStyle.itemCount}>
                          <Text>{item.quantity}</Text>
                        </View>
                      </KeyboardAvoidingView>
                      <Pressable
                        style={CartStyle.cartTrash}
                        onPress={() => handleIncrementQuantity(item.id)}>
                        <PlusIcon name="plus" color={'#555'} size={15} />
                      </Pressable>
                    </View>

                    <View style={[globalStyle.drow, globalStyle.alignCenter]}>
                      <View style={globalStyle.dcol}>
                        <Text style={CartStyle.itemTotalAmount}>
                          ₹ {item.quantity * item.price}
                        </Text>
                        <Text style={globalStyle.xsSmall}>price details</Text>
                      </View>
                      <View>
                        <DownArrowIcon name="chevron-small-down" size={22} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            <View
              style={[globalStyle.mt10, globalStyle.mx10, globalStyle.mb80]}>
              <View
                style={[globalStyle.cardOuter, globalStyle.borderTopRadius]}>
                <View style={[globalStyle.card, globalStyle.borderTopRadius]}>
                  <Header type={3} title="Payment summary" />
                </View>
                <View style={[globalStyle.card, globalStyle.mt5]}>
                  <View style={globalStyle.px10}>
                    <View style={CartStyle.ttlAmt}>
                      <View>
                        <Text style={CartStyle.ttlAmtText}>
                          Total Amount ({cart.length} items)
                        </Text>
                      </View>
                      <View>
                        <Text style={CartStyle.ttlAmtText}>
                          ₹ {totalAmount}
                        </Text>
                      </View>
                    </View>
                    <View style={CartStyle.ttlAmt}>
                      <View>
                        <Text style={CartStyle.gstText}>Total GST</Text>
                      </View>
                      <View>
                        <Text style={CartStyle.gstText}>
                          ₹ {gstAmount.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={CartStyle.ttlAmt}>
                      <View>
                        <Text style={CartStyle.gstText}>Total Shipping</Text>
                        <Text style={globalStyle.xxsSmall}>
                          Charges may vary according to delivery location
                        </Text>
                      </View>
                      <View>
                        <Text style={CartStyle.gstText}>
                          ₹ {shippingCharges}
                        </Text>
                      </View>
                    </View>
                    <View style={CartStyle.ttlAmt}>
                      <View>
                        <Text style={CartStyle.gstText}>Platform fee</Text>
                      </View>
                      <View>
                        <Text style={CartStyle.gstText}>₹ {platformFee}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    globalStyle.card,
                    globalStyle.borderBottomRadius,
                    CartStyle.borderTop,
                  ]}>
                  <View
                    style={[
                      globalStyle.drow,
                      globalStyle.alignCenter,
                      globalStyle.justifyBetween,
                    ]}>
                    <Header type={3} title="Amount payble" />
                    <Header type={3} title={`₹ ${checkoutAmount.toFixed(2)}`} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={[CartStyle.stickyCheckoutContainer, CartStyle.shadowProp]}>
            <View style={globalStyle.dcol}>
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg3,
                ]}>
                <Text style={CartStyle.checkoutText}>Payble Amount</Text>
                <InfoIcon color={'#005792'} size={17} name="info" />
              </View>
              <Header title={`₹ ${checkoutAmount.toFixed(2)}`} type={3} />
            </View>
            <View>
              <Pressable
                style={CartStyle.CheckoutBtn}
                onPress={handleCheckOutNavigation}>
                {loading ? (
                  <View
                    style={[
                      globalStyle.drow,
                      globalStyle.alignCenter,
                      globalStyle.cg3,
                    ]}>
                    <ActivityIndicator size={20} color={'#fff'} />
                    <Text style={CartStyle.checkoutBtnText}>
                      Proceed to Checkout
                    </Text>
                  </View>
                ) : (
                  <Text style={CartStyle.checkoutBtnText}>
                    Proceed to Checkout
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <ScrollView>
          <View style={CartStyle.userNoLoggedIn}>
            <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
              No items in your cart
            </Text>
            <View style={globalStyle.lottyani}>
              <LottieView
                style={{flex: 1}}
                source={require('./nocart.json')}
                autoPlay
                loop
              />
            </View>
            <View style={[globalStyle.mt10, globalStyle.w100]}>
              <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
                Let's add some items
              </Text>
              <Pressable
                style={CartStyle.mainBtn}
                onPress={() => navigation.navigate(Routes.Products)}>
                <View>
                  <Text style={CartStyle.mainBtnText}>Continue shopping</Text>
                </View>
              </Pressable>

              {!isAuthenticated && (
                <View>
                  <Pressable
                    onPress={() => navigation.navigate(Routes.EmailEntry)}>
                    <Text
                      style={[globalStyle.warnText, globalStyle.textCenter]}>
                      SIGN IN NOW
                    </Text>
                  </Pressable>
                  <Text style={[globalStyle.textCenter, CartStyle.describe]}>
                    To see the items you added previously
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={CartStyle.modalOverlay}>
          <View style={CartStyle.modalContent}>
            <View style={[globalStyle.drow, globalStyle.justifyBetween]}>
              <View>
                <Text style={[globalStyle.subtext, globalStyle.fwbold]}>
                  Are you sure to remove this item?
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <CloseIcon name="closecircle" size={20} />
              </Pressable>
            </View>
            {selectedProduct && (
              <View style={[globalStyle.mt10]}>
                <View style={[CartStyle.removeFromCart, globalStyle.my10]}>
                  <Image
                    source={{uri: selectedProduct.images?.[0]?.url}}
                    style={CartStyle.modalImage}
                  />
                  <View>
                    <Text style={globalStyle.normalText}>
                      {selectedProduct.name}
                    </Text>
                    <View style={globalStyle.mt5}>
                      <Text style={[CartStyle.cuttedPrice]}>
                        ₹{selectedProduct.cuttedPrice}
                      </Text>
                      <Text
                        style={[
                          globalStyle.normalText,
                          globalStyle.mt3,
                          globalStyle.fwbold,
                        ]}>
                        ₹{selectedProduct.price}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[globalStyle.drow, globalStyle.cg5, globalStyle.mt10]}>
                  <Pressable
                    style={CartStyle.removeCartBtn}
                    onPress={confirmRemove}>
                    <View
                      style={[
                        globalStyle.drow,
                        globalStyle.alignCenter,
                        globalStyle.cg5,
                      ]}>
                      <TrashIcon name="trash" color={'#f9b000'} size={17} />
                      <Text style={CartStyle.removeFromCartText}>Remove</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    style={[
                      CartStyle.wishlistBtn,
                      alreadyInWishlist && {opacity: 0.7},
                    ]}
                    onPress={handleWishListAddCartRemove}
                    disabled={alreadyInWishlist}>
                    <Text style={CartStyle.wishlistBtnText}>
                      {alreadyInWishlist
                        ? 'Already in Wishlist'
                        : 'Move to wishlist'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Cart;
