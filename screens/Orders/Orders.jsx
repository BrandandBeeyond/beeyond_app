import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {OrderStyle} from './Style';
import LottieView from 'lottie-react-native';
import {Routes} from '../../navigation/Routes';
import {useSelector} from 'react-redux';

const Orders = ({navigation}) => {
  const {isAuthenticated} = useSelector(state => state.user);
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
        {isAuthenticated && renderTabs()}

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
                  <Text style={OrderStyle.mainBtnText}>Continue shopping</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
