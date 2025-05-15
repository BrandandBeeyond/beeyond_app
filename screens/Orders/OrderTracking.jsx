import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {globalStyle} from '../../assets/styles/globalStyle';
import {CartStyle} from '../Cart/Style';
import {useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';
import {cancelOrder} from '../../redux/actions/OrderAction';
import {useDispatch, useSelector} from 'react-redux';
import {SendEmailNotification} from '../../redux/actions/OrderNotificationAction';
import {addNotification} from '../../redux/actions/BellNotiAction';

const labels = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

const customStyles = {
  stepIndicatorSize: 14,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#f9b000',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#f9b000',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#f9b000',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f9b000',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  lalabelColor: '#999999',
  labelAlign: 'flex-start',
  labelPaddingTop: 4,
  labelSize: 11,
  currentStepLabelColor: '#f9b000',
};

const OrderTracking = ({route}) => {
  const navigation = useNavigation();
  const rippleAnim = useRef(new Animated.Value(1)).current;
  const {user} = useSelector(state => state.user);

  const {orderItems, orderId, orderNumber} = route.params;

  const dispatch = useDispatch();
  // useState added to handle dynamic order status updates
  const [orderStatus, setOrderStatus] = useState(route.params.orderStatus);

  const currentPosition = labels.indexOf(orderStatus);
  const isValidStatus = currentPosition !== -1;

  useEffect(() => {
    if (!isValidStatus) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [rippleAnim, isValidStatus]);

  const handleCancelOrder = orderId => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel the order?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: async () => {
          try {
            // const response = await axios.put(`${serverApi}/cancel/${orderId}`);
            // console.log('Order cancelled:', response.data);

            const orderCancelled = dispatch(cancelOrder(orderId));

            if (orderCancelled) {
              Alert.alert('Order Cancelled', 'Your order has been cancelled.');
              setOrderStatus('Cancelled');

              const emailPayload = {
                eventType: 'order_cancelled',
                user: {
                  name: user.name,
                  email: user.email,
                  mobile: user.mobile,
                },
              };

              const emailResult = await dispatch(
                SendEmailNotification(emailPayload),
              );

              console.log('Email dispatch result:', emailResult);

              await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
              });

              await notifee.displayNotification({
                title: 'Your Order Has Been Cancelled',
                body: `Hello, ${user.name}, your order has been Cancelled!`,
                android: {
                  channelId: 'default',
                  smallIcon: 'ic_launcher',
                },
              });

              await dispatch(
                addNotification({
                  title: 'Order Cancelled!',
                  message: 'Your order has been successfully placed.',
                  type: 'order',
                }),
              );
            }
          } catch (error) {
            console.error('Cancel Order Error:', error.message);
            Alert.alert(
              'Cancellation Failed',
              error?.response?.data?.message || 'Something went wrong.',
            );
          }
        },
      },
    ]);
  };

  const renderStepIndicator = ({position, stepStatus}) => {
    const isActive = position === currentPosition;

    return (
      <View style={styles.circleWrapper}>
        {isActive && (
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{scale: rippleAnim}],
                opacity: rippleAnim.interpolate({
                  inputRange: [1, 1.5],
                  outputRange: [0.4, 0],
                }),
              },
            ]}
          />
        )}
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                stepStatus === 'finished' ? '#f9b000' : '#ffffff',
              borderColor: stepStatus === 'finished' ? '#f9b000' : '#aaaaaa',
              borderWidth: stepStatus === 'current' ? 0 : 2,
            },
          ]}
        />
      </View>
    );
  };

  const renderSeparator = ({position}) => {
    const isFinished = position < currentPosition;
    return (
      <View style={styles.separatorContainer}>
        <Animated.View
          style={[
            styles.separator,
            {
              backgroundColor: isFinished ? '#fe7013' : '#aaaaaa',
            },
          ]}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={[
          globalStyle.mx10,
          globalStyle.py10,
          globalStyle.bgWhite,
          globalStyle.mt20,
          globalStyle.px10,
          globalStyle.rounded3,
        ]}>
        {orderItems.map((item, index) => (
          <View
            key={index}
            style={[
              globalStyle.drow,
              globalStyle.justifyBetween,
              globalStyle.mb10,
              globalStyle.bgWhite,
              globalStyle.rounded3,
            ]}>
            <View style={[globalStyle.flex, globalStyle.mx10]}>
              <Text style={[globalStyle.h2]}>{item.name}</Text>
              <Text
                style={[
                  globalStyle.h4,
                  globalStyle.fw700,
                  globalStyle.textGray,
                ]}>
                ₹ {item.price}
              </Text>
            </View>
            <Image
              source={{uri: item.image}}
              style={[
                CartStyle.cartProd,
                globalStyle.rounded3,
                {width: 70, height: 70},
              ]}
            />
          </View>
        ))}
        <View
          style={[
            globalStyle.dflex,
            globalStyle.justifyCenter,
            globalStyle.ps3,
          ]}>
          <Text
            style={[
              globalStyle.h6,
              {
                color: orderStatus === 'Cancelled' ? 'red' : 'green',
                marginBottom: 10,
              },
            ]}>
            <Text style={[globalStyle.h6, globalStyle.textGray]}>
              Order Status:
            </Text>{' '}
            {orderStatus}
          </Text>
        </View>
      </View>

      <View
        style={[
          globalStyle.flex,
          globalStyle.bgTheme,
          {alignItems: 'flex-start'},
        ]}>
        {isValidStatus && orderStatus !== 'Cancelled' ? (
          <View style={styles.trackerContainer}>
            <StepIndicator
              direction="vertical"
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={labels.length}
              renderStepIndicator={renderStepIndicator}
              renderSeparator={renderSeparator}
            />
          </View>
        ) : orderStatus === 'Cancelled' ? (
          <View
            style={[[globalStyle.mx15, globalStyle.py10, globalStyle.mb20]]}>
            <Text style={[globalStyle.h4]}>
              Order Id {orderNumber} has been cancelled..
            </Text>
          </View>
        ) : (
          <View style={styles.invalidStatusContainer}>
            <Animated.Text style={styles.invalidStatusText}>
              Invalid order status
            </Animated.Text>
          </View>
        )}
        <View
          style={[
            globalStyle.dflex,
            globalStyle.drow,
            globalStyle.justifyBetween,
            globalStyle.mx15,
            globalStyle.cg5,
          ]}>
          <Pressable
            style={[
              globalStyle.simplebtn,
              orderStatus === 'Cancelled'
                ? {backgroundColor: '#ccc'} // Disabled look
                : globalStyle.bgWhite, // Active look
            ]}
            onPress={() => handleCancelOrder(orderId)}
            disabled={orderStatus === 'Cancelled'}>
            <Text
              style={[
                globalStyle.h6,
                globalStyle.fw700,
                {color: orderStatus === 'Cancelled' ? '#888' : '#000'},
              ]}>
              Cancel Order
            </Text>
          </Pressable>

          <Pressable
            style={[globalStyle.bgWhite, globalStyle.simplebtn]}
            onPress={() => navigation.navigate('FAQ')}>
            <Text style={[globalStyle.h6, globalStyle.fw700]}>Need Help?</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  trackerContainer: {
    marginLeft: 20,
    height: 400,
  },
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
  },
  ripple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fe7013',
    zIndex: -1,
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 2,
    height: '100%',
    borderRadius: 1,
  },
  invalidStatusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },
  invalidStatusText: {
    color: '#999',
    fontSize: 16,
  },
});

export default OrderTracking;
