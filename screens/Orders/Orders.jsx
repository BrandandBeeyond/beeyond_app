
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {OrderStyle} from './Style';
import LottieView from 'lottie-react-native';
import {Routes} from '../../navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {getUserOrders} from '../../redux/actions/OrderAction';
import {CartStyle} from '../Cart/Style';

const Orders = ({navigation}) => {
  const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector(state => state.user);
  const {orders} = useSelector(state => state.orders);
  console.log(orders);

 
  
  useEffect(() => {
    if (user && user._id) {
      
      dispatch(getUserOrders(user._id));
    }
  }, [dispatch,user]);

  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Paid', 'Delivered', 'Cancelled'];

  const renderTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={OrderStyle.tabContainer}>
      {tabs.map(tab => (
        <Pressable
          key={tab}
          style={[
            OrderStyle.tabItem,
            activeTab === tab && OrderStyle.tabItemActive,
          ]}
          onPress={() => setActiveTab(tab)}>
          <Text
            style={[
              OrderStyle.tabText,
              activeTab === tab && OrderStyle.tabTextActive,
            ]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        {isAuthenticated && orders?.length > 0 && renderTabs()}

        {isAuthenticated && orders.length > 0 ? (
          <>
            {orders.map((item, index) => (
              <View
                key={index}
                style={[
                  globalStyle.mx10,
                  globalStyle.py10,
                  globalStyle.bgWhite,
                  globalStyle.mt20,
                  globalStyle.px10,
                  globalStyle.rounded3,
                ]}>
                {/* Order Header */}
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.justifyBetween,
                    globalStyle.mb10,
                  ]}>
                  <Text style={[globalStyle.textsmall,globalStyle.my10, {fontWeight: 'bold'}]}>
                    {item.orderNumber}
                  </Text>
                  <Text style={[globalStyle.subtext]}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                {/* Order Items */}
                {item.orderItems.map((orderItem, idx) => (
                  <View
                    key={idx}
                    style={[
                      globalStyle.drow,
                      globalStyle.cg5,
                      globalStyle.mb10,
                      {
                        borderBottomWidth:
                          idx !== item.orderItems.length - 1 ? 1 : 0,
                        borderColor: '#eee',
                        paddingBottom: 10,
                      },
                    ]}>
                    <Image
                      source={{uri: orderItem.image}}
                      style={[
                        CartStyle.cartProd,
                        globalStyle.rounded3,
                        {width: 70, height: 70},
                      ]}
                    />
                    <View style={[globalStyle.flex1]}>
                      <Text style={[globalStyle.h6, {marginBottom: 4}]}>
                        {orderItem.name}
                      </Text>
                      <Text style={globalStyle.subtext}>
                        Qty: {orderItem.quantity}
                      </Text>
                      <Text style={globalStyle.price}>₹ {orderItem.price}</Text>
                    </View>
                  </View>
                ))}

                {/* Order Footer */}
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.justifyBetween,
                    globalStyle.mt10,
                    {borderTopWidth: 1, borderColor: '#eee', paddingTop: 10},
                  ]}>
                  <Text style={globalStyle.h6}>Status: {item.orderStatus}</Text>
                  <Text style={[globalStyle.h6, {color: '#000'}]}>
                    Total: ₹ {item.totalPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={OrderStyle.userNoLoggedIn}>
            <View style={globalStyle.lottyani}>
              <LottieView
                style={{flex: 1}}
                source={require('./noorders.json')}
                autoPlay
                loop
              />
            </View>

            <View style={[globalStyle.mt10, globalStyle.w100]}>
              {!isAuthenticated ? (
                <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
                  Please login to view your orders
                </Text>
              ) : (
                <Text style={[globalStyle.subtext, globalStyle.textCenter]}>
                  No orders found
                </Text>
              )}

              {isAuthenticated ? (
                <Pressable
                  style={OrderStyle.mainBtn}
                  onPress={() => navigation.navigate(Routes.Products)}>
                  <View>
                    <Text style={OrderStyle.mainBtnText}>
                      Continue shopping
                    </Text>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  style={OrderStyle.mainBtn}
                  onPress={() => navigation.navigate(Routes.EmailEntry)}>
                  <View>
                    <Text style={OrderStyle.mainBtnText}>Login now</Text>
                  </View>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
