import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {getShippingInfo} from '../../redux/actions/UserAction';
import {checkOutStyle} from './Style';
import {CartStyle} from '../Cart/Style';
import Header from '../../components/Header/Header';
import {
  createPaymentOrder,
  verifyPayment,
} from '../../redux/actions/PaymentAction';
import RazorpayCheckout from 'react-native-razorpay';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const SavedAddress = () => {
  const dispatch = useDispatch();
  const {loading, shippingInfo, user} = useSelector(state => state.user);
  const {cart} = useSelector(state => state.cart);

  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getShippingInfo(user._id));
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          globalStyle.flex,
          globalStyle.bgTheme,
          globalStyle.alignCenter,
        ]}>
        <ActivityIndicator size="large" color="#f9b000" />
        <Text>Loading addresses...</Text>
      </SafeAreaView>
    );
  }

  const addresses = shippingInfo?.addresses || [];

  // ✅ Calculate Payment Summary
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const gstRate = 0.18; // 18% GST
  const gstAmount = totalAmount * gstRate;
  // const shippingCharges = totalAmount > 500 ? 0 : 50;
  const shippingCharges = 50;
  const platformFee = 9; // Fixed platform fee
  const checkoutAmount =
    totalAmount + gstAmount + shippingCharges + platformFee;

  const handlePayment = async () => {
    setLoadingPayment(true);
    try {
      const orderData = await dispatch(createPaymentOrder(checkoutAmount));

      if (!orderData) {
        Alert.alert('Error', 'Failed to create order');
        return;
      }

      const options = {
        description: 'Payment for your Order',
        currency: 'INR',
        key: 'rzp_test_D7EJNKkg5iH19i',
        amount: orderData.amount,
        name: 'Beeyond',
        order_id: orderData.id,
        prefill: {
          email: user?.email || '',
          contact: user?.phone || '',
          name: user?.name || '',
        },
        theme: {color: '#f9b000'},
      };

      RazorpayCheckout.open(options)
        .then(async data => {
          const paymentData = {
            razorpay_order_id: orderData.id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
          };

          await dispatch(verifyPayment(paymentData));

          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Payment Successfull',
            button: 'close',
          })
        })
        .catch(error => {
          console.log('Payment failed', error);
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Payment Failed',
            button: 'close',
          })
        });
    } catch (error) {
      console.error('Error in payment flow', error);
      Alert.alert('Error', 'Something went wrong!');
    }finally{
      setLoadingPayment(false);
    }
  };
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        {/* Address Section */}
        <View style={[globalStyle.my10, globalStyle.px10]}>
          <Text style={[globalStyle.medium, globalStyle.fw700]}>
            {addresses.length > 0
              ? `Delivery address (${addresses.length})`
              : 'No saved addresses found'}
          </Text>

          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <View
                key={index}
                style={[
                  globalStyle.cardOuter,
                  globalStyle.my15,
                  globalStyle.rounded3,
                ]}>
                <View style={[globalStyle.card, globalStyle.rounded3]}>
                  <Text style={[globalStyle.normalText, globalStyle.fw700]}>
                    {user?.name || 'N/A'}
                  </Text>
                  <View style={globalStyle.mt3}>
                    <Text style={globalStyle.xsSmall}>
                      {address.flatNo}, {address.area}
                    </Text>
                    <Text style={globalStyle.xsSmall}>
                      {address.landmark ? `${address.landmark},` : ''}{' '}
                      {address.city}, {address.state}
                    </Text>
                    <Text style={globalStyle.xsSmall}>
                      {address.country} - {address.pincode}
                    </Text>
                    <Text style={globalStyle.xsSmall}>
                      Mobile: {address.mobile}
                    </Text>
                  </View>
                  <View style={globalStyle.mt10}>
                    <Pressable style={[checkOutStyle.addmoreAddress]}>
                      <Text
                        style={[
                          checkOutStyle.addmoreAddressText,
                          globalStyle.textCenter,
                        ]}>
                        Change or add address
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              No saved addresses yet.
            </Text>
          )}
        </View>

        {/* Cart Items Section */}
        <View style={[globalStyle.my10, globalStyle.px10]}>
          <Text style={[globalStyle.medium, globalStyle.fw700]}>
            Cart Items ({cart.length})
          </Text>

          {cart.length > 0 ? (
            cart.map((item, index) => (
              <View
                key={index}
                style={[
                  globalStyle.py10,
                  globalStyle.bgWhite,
                  globalStyle.mt20,
                  globalStyle.px10,
                  globalStyle.rounded3,
                  globalStyle.dcol,
                ]}>
                <View style={[globalStyle.drow, globalStyle.cg5]}>
                  <Image
                    source={{uri: item.images?.[0]?.url}}
                    style={[CartStyle.cartProd, globalStyle.rounded3]}
                  />

                  <View>
                    <Text style={globalStyle.medium}>{item.name}</Text>
                    <View>
                      <View
                        style={[
                          globalStyle.drow,
                          globalStyle.alignCenter,
                          globalStyle.cg5,
                          globalStyle.mt10,
                        ]}>
                        <Text
                          style={[globalStyle.small, CartStyle.cuttedPrice]}>
                          ₹ {item.cuttedPrice}
                        </Text>
                        <Text style={CartStyle.price}>₹ {item.price}</Text>
                      </View>

                      <View
                        style={[
                          globalStyle.drow,
                          globalStyle.alignCenter,
                          globalStyle.justifyBetween,
                          globalStyle.mt5,
                        ]}>
                        <Text style={globalStyle.normalText}>
                          Qty: {item.quantity}
                        </Text>
                        <Text
                          style={[globalStyle.normalText, globalStyle.fw700]}>
                          ₹ {item.quantity * item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={[globalStyle.normalText, globalStyle.mt10]}>
              No items in your cart.
            </Text>
          )}
        </View>

        {/* Payment Summary Section */}
        <View style={[globalStyle.mt10, globalStyle.mx10, globalStyle.mb80]}>
          <View style={[globalStyle.cardOuter, globalStyle.borderTopRadius]}>
            <View style={[globalStyle.card, globalStyle.borderTopRadius]}>
              <Header type={3} title="Payment summary" />
            </View>

            <View style={[globalStyle.card, globalStyle.mt5]}>
              <View style={globalStyle.px10}>
                <View style={CartStyle.ttlAmt}>
                  <Text style={CartStyle.ttlAmtText}>
                    Total Amount ({cart.length} items)
                  </Text>
                  <Text style={CartStyle.ttlAmtText}>₹ {totalAmount}</Text>
                </View>

                <View style={CartStyle.ttlAmt}>
                  <Text style={CartStyle.gstText}>Total GST</Text>
                  <Text style={CartStyle.gstText}>
                    ₹ {gstAmount.toFixed(2)}
                  </Text>
                </View>

                <View style={CartStyle.ttlAmt}>
                  <Text style={CartStyle.gstText}>Total Shipping</Text>
                  <Text style={globalStyle.xxsSmall}>
                    Charges may vary according to delivery location
                  </Text>
                  <Text style={CartStyle.gstText}>₹ {shippingCharges}</Text>
                </View>

                <View style={CartStyle.ttlAmt}>
                  <Text style={CartStyle.gstText}>Platform fee</Text>
                  <Text style={CartStyle.gstText}>₹ {platformFee}</Text>
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
                <Header type={3} title="Amount payable" />
                <Header type={3} title={`₹ ${checkoutAmount.toFixed(2)}`} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={[CartStyle.stickyCheckoutContainer, CartStyle.shadowProp]}>
        <View style={globalStyle.dcol}>
          <View
            style={[
              globalStyle.drow,
              globalStyle.alignCenter,
              globalStyle.cg3,
            ]}>
            <Text style={CartStyle.checkoutText}>Payble Amount</Text>
          </View>
          <Header title={`₹ ${checkoutAmount.toFixed(2)}`} type={3} />
        </View>
        <View style={[CartStyle.stickyCheckoutContainer, CartStyle.shadowProp]}>
          <View style={globalStyle.dcol}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.cg3,
              ]}>
              <Text style={CartStyle.checkoutText}>Pay now</Text>
            </View>
            <Header title={`₹ ${checkoutAmount.toFixed(2)}`} type={3} />
          </View>
          <View>
            <Pressable style={CartStyle.CheckoutBtn} onPress={handlePayment} disabled={loadingPayment}>
              {loadingPayment ? (
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg3,
                  ]}>
                  <ActivityIndicator size={20} color={'#fff'} />
                  <Text style={CartStyle.checkoutBtnText}>Continue</Text>
                </View>
              ) : (
                <Text style={CartStyle.checkoutBtnText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SavedAddress;
