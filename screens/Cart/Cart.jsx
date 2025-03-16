import React, {useState} from 'react';
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
import {AddNotification} from '../../redux/actions/NotificationAction';
import Header from '../../components/Header/Header';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {productStyle} from '../Products/Style';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, cart} = useSelector(state => state.cart);
  const {notifications} = useSelector(state => state.notifications);
  const {isAuthenticated} = useSelector(state => state.user);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleRemoveFromCart = product => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const confirmRemove = () => {
    if (selectedProduct) {
      dispatch(RemovefromCart(selectedProduct.id));
      dispatch(AddNotification('Cart item removed from cart'));
      setModalVisible(false);
    }
  };

  const handleIncrementQuantity = productId => {
    dispatch(incrementQuantity(productId));
    dispatch(AddNotification('Cart quantity updated successfully!'));
  };

  const handleDecrementQuantity = productId => {
    dispatch(decrementQuantity(productId));
    dispatch(AddNotification('Cart quantity updated successfully!'));
  };
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      {cart.length > 0 ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
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
            </View>

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
                      navigation.navigate(Routes.ProductDetail, {product: item})
                    }>
                    <Image
                      source={{uri:item.images?.[0]?.url}}
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
                onPress={() => navigation.navigate(Routes.Checkoutform)}>
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
      {notifications.map(notification => (
        <Notification key={notification.id} message={notification.message} />
      ))}
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
                    source={selectedProduct.thumbnail}
                    style={CartStyle.modalImage}
                  />
                  <View>
                    <Text style={globalStyle.normalText}>
                      {selectedProduct.title}
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
                  <Pressable style={CartStyle.wishlistBtn}>
                    <Text style={CartStyle.wishlistBtnText}>
                      Move to wishlist
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
