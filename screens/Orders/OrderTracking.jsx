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
  Modal,
  Linking,
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
import CloseIcon from 'react-native-vector-icons/AntDesign';
import CallIcon from '../../assets/images/icons/phone.png';
import WhatsappIcon from '../../assets/images/icons/whatsapp.png';
import EmailIcon from '../../assets/images/icons/gmail.png';
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
  const [orderStatus, setOrderStatus] = useState(route.params.orderStatus);
  const [modalVisible, setModalVisible] = useState(false);

  const currentPosition = labels.indexOf(orderStatus);
  const isValidStatus = currentPosition !== -1;


  const handleCallPress=()=>{
      const phoneNumber = 'tel:7030087111';
      Linking.openURL(phoneNumber).catch((err)=>console.error('Error opening call:', err));   
  }

 const handleWhatsAppPress = () => {
  const phoneNumber = '7030087111'; // Phone number without the country code
  const countryCode = '+91'; // India country code

  // Format the URL properly
  const whatsappURL = `whatsapp://send?phone=${countryCode}${phoneNumber}`;
  
  // Try to open WhatsApp
  Linking.openURL(whatsappURL)
    .catch((err) => {
      console.error('Error opening WhatsApp:', err);
      Alert.alert('WhatsApp is not installed or there was an issue opening it.');
    });
};

const handleEmailPress = () => {
  const emailURL = 'mailto:beeyondhappiness@gmail.com';
  Linking.openURL(emailURL).catch((err) => console.error('Error opening email:', err));
};

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
              body: `Hello, ${user.name}, your order has been cancelled!`,
              android: {
                channelId: 'default',
                smallIcon: 'ic_launcher',
              },
            });

            await dispatch(
              addNotification({
                title: 'Order Cancelled!',
                message: 'Your order has been successfully cancelled.',
                type: 'order',
              }),
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
              <View style={[globalStyle.dflex, globalStyle.justifyCenter]}>
                <Text
                  style={[
                    globalStyle.h4,
                    globalStyle.fwsemibold,
                    {
                      color:
                        orderStatus === 'Cancelled'
                          ? 'red'
                          : orderStatus === 'Delivered'
                          ? 'green'
                          : 'orange',
                      marginBottom: 10,
                    },
                  ]}>
                  {orderStatus}
                </Text>
              </View>
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
      </View>

      <View
        style={[
          globalStyle.flex,
          globalStyle.bgTheme,
          {alignItems: 'flex-start'},
        ]}>
        {isValidStatus &&
        orderStatus !== 'Cancelled' &&
        orderStatus !== 'Delivered' ? (
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
          <View style={[globalStyle.mx15, globalStyle.py10, globalStyle.mb20]}>
            <Text style={[globalStyle.h4]}>
              Order Id {orderNumber} has been cancelled.
            </Text>
          </View>
        ) : orderStatus === 'Delivered' ? (
          <View style={[globalStyle.mx15, globalStyle.py10, globalStyle.mb20]}>
            <Text style={[globalStyle.h4]}>
              Order Id {orderNumber} has been Delivered.
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
          {orderStatus !== 'Delivered' ? (
            <>
              {' '}
              <Pressable
                style={[
                  globalStyle.simplebtn,
                  orderStatus === 'Cancelled' || orderStatus === 'Delivered'
                    ? {backgroundColor: '#ccc'}
                    : globalStyle.bgWhite,
                ]}
                onPress={() => handleCancelOrder(orderId)}
                disabled={
                  orderStatus === 'Cancelled' || orderStatus === 'Delivered'
                }>
                <Text
                  style={[
                    globalStyle.h6,
                    globalStyle.fw700,
                    {
                      color:
                        orderStatus === 'Cancelled' ||
                        orderStatus === 'Delivered'
                          ? '#888'
                          : '#000',
                    },
                  ]}>
                  Cancel Order
                </Text>
              </Pressable>
              <Pressable
                style={[globalStyle.bgWhite, globalStyle.simplebtn]}
                onPress={() => navigation.navigate('FAQ')}>
                <Text style={[globalStyle.h6, globalStyle.fw700]}>
                  Need Help?
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                style={[
                  globalStyle.bgSemiLight,
                  globalStyle.drow,
                  globalStyle.justifyCenter,
                  globalStyle.alignCenter,
                  globalStyle.px10,
                  globalStyle.py10,
                  globalStyle.flex,
                  globalStyle.rounded3,
                  globalStyle.mt30,
                ]}
                onPress={() => setModalVisible(true)}>
                <Text
                  style={[
                    globalStyle.h6,
                    globalStyle.fw700,
                    globalStyle.textGray,
                  ]}>
                  Need Help with this order ?
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>

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
                  Connect with us now
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <CloseIcon name="closecircle" size={20} />
              </Pressable>
            </View>

            <View
              style={[
                globalStyle.px20,
                globalStyle.py10,
                globalStyle.drow,
                globalStyle.alignCenter,
                globalStyle.justifyCenter,
              ]}>
              <View style={[globalStyle.p8,globalStyle.justifyBetween,globalStyle.drow,globalStyle.alignCenter,globalStyle.cg10]}>
                <Pressable onPress={handleCallPress}>
                  <Image source={CallIcon} style={styles.deliveredIcon}/>
                </Pressable>
                <Pressable onPress={handleWhatsAppPress}>
                  <Image source={WhatsappIcon} style={styles.deliveredIcon}/>
                </Pressable>
                <Pressable onPress={handleEmailPress}>
                  <Image source={EmailIcon} style={styles.deliveredIcon}/>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  deliveredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  deliveredIcon: {
    width: 45,
    height:45,
    marginTop: 20,
  },
});

export default OrderTracking;
