import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import {scaleFontSize} from '../assets/styles/Scaling';
import Cart from '../screens/Cart/Cart';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Products from '../screens/Products/Products';
import Orders from '../screens/Orders/Orders';
import {Text, TouchableOpacity, View} from 'react-native';
import LoginMobile from '../screens/Login/LoginMobile';
import Otpscreen from '../screens/Otpscreen/Otpscreen';
import HomeIcon from 'react-native-vector-icons/Feather';
import ProductIcon from 'react-native-vector-icons/Ionicons';
import BagIcon from 'react-native-vector-icons/Feather';
import NotePadIcon from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/Feather';
import {globalStyle} from '../assets/styles/globalStyle';
import {CartStyle} from '../screens/Cart/Style';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ProductDetail from '../screens/ProductDetail/ProductDetail';
import Signup from '../screens/Login/SignUp';
import EmailEntry from '../screens/Login/EmailEntry';
import PasswordEntry from '../screens/Login/PasswordEntry';
import MyAccount from '../screens/Account/MyAccount';
import EmailOtpScreen from '../screens/Otpscreen/EmailOtpScreen';
import Checkoutform from '../screens/Checkout/Checkoutform';
import Wishlist from '../screens/Wishlist/Wishlist';
import ForgotPassword from '../screens/Login/ForgotPassword';
import ResetPassword from '../screens/Login/ResetPassword';
import Contact from '../screens/Contact/Contact';
import SignupEmail from '../screens/Login/SignupEmail';
import ProtectedRoute from '../ProtectedRoute';
import CheckoutForm from '../screens/Checkout/Checkoutform';
import SavedAddress from '../screens/Checkout/SavedAddress';
import OrderPlaced from '../screens/OrderStatus/OrderPlaced';
import OrderTracking from '../screens/Orders/OrderTracking';
import BellNotification from '../screens/Notifications/BellNotification';
import EmailOtpVerification from '../screens/Otpscreen/EmailOtpVerfication';
import ChangePassword from '../screens/Login/ChangePassword';
import OtpScreenNewuser from '../screens/Otpscreen/OtpScreenNewuser';
import SelectAddress from '../screens/Checkout/SelectAddress';
import FAQ from '../screens/FAQ/FAQ';
import Privacypolicy from '../screens/Privacy/Privacypolicy';
import About from '../screens/About/About';
import Search from '../screens/Search/Search';
import NoRecords from '../screens/NoRecords/NoRecords';
import Coupon from '../screens/Cart/Coupon';
import Hearticon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomBackButton = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{marginRight: 20, marginLeft: 10}}>
      <FontAwesomeIcon icon={faArrowLeft} size={20} />
    </TouchableOpacity>
  );
};

const CustomHeaderIcons = () => {
  const navigation = useNavigation();
  const {cart} = useSelector(state => state.cart);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 15,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.Search)}>
        <SearchIcon name="search" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyle.relative}
        onPress={() => navigation.navigate(Routes.Cart)}>
        <BagIcon name="shopping-bag" size={20} />
        {cart.length > 0 && (
          <View style={CartStyle.CountCart}>
            <Text
              style={{
                color: '#fff',
                fontSize: scaleFontSize(10),
                fontWeight: 'bold',
              }}>
              {cart.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const CustomHeaderIconsProductDetail = () => {
  const navigation = useNavigation();
  const {cart} = useSelector(state => state.cart);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 15,
      }}>
     
      <TouchableOpacity
        style={globalStyle.relative}
        onPress={() => navigation.navigate(Routes.Wishlist)}>
        <Hearticon name="heart" size={20} />
       
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyle.relative}
        onPress={() => navigation.navigate(Routes.Cart)}>
        <BagIcon name="shopping-bag" size={20} />
        {cart.length > 0 && (
          <View style={CartStyle.CountCart}>
            <Text
              style={{
                color: '#fff',
                fontSize: scaleFontSize(10),
                fontWeight: 'bold',
              }}>
              {cart.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            return <HomeIcon name="home" size={22} color={color} />;
          } else if (route.name === 'Cart') {
            return <BagIcon name="shopping-bag" size={22} color={color} />;
          } else if (route.name === 'Products') {
            return <ProductIcon name="grid-outline" size={22} color={color} />;
          } else if (route.name === 'Orders') {
            return <NotePadIcon name="clipboard" size={22} color={color} />;
          }
        },

        tabBarActiveTintColor: '#f9b000',
        tabBarInactiveTintColor: '#3d3c3c',
        tabBarStyle: {
          backgroundColor: 'white',
          padding: 15,
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowRadius: 20,
        },
        tabBarIconStyle: {fontSize: 10, alignSelf: 'center'},
      })}>
      <Tab.Screen name="Home" component={Home} options={{header: () => null}} />
      <Tab.Screen
        name="Products"
        component={Products}
        options={({navigation}) => ({
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerRight: () => <CustomHeaderIcons />,
        })}
      />

      <Tab.Screen
        name="Orders"
        component={Orders}
        options={({navigation}) => ({
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerLeft: () => <CustomBackButton navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={({navigation}) => ({
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerLeft: () => <CustomBackButton navigation={navigation} />,
        })}
      />
    </Tab.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <Stack.Navigator>
      {/* Add header for BottomTabs screen */}
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: () => null}}
      />
      {/* Adding Screens in StackNavigator with Back Button */}
      <Stack.Screen
        name="Products"
        component={Products}
        options={({navigation}) => ({
          headerTitleStyle: {fontSize: scaleFontSize(15)},
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerRight: () => <CustomHeaderIcons />,
        })}
      />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={({navigation}) => ({
          headerTitleStyle: {fontSize: scaleFontSize(15)},
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerRight: () => <CustomHeaderIcons />,
        })}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({navigation}) => ({
          headerTitle: () => null,
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerRight: () => <CustomHeaderIconsProductDetail />,
        })}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
        })}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
        })}
      />
      {/* Profile screen with custom header title style */}
      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={{headerTitleStyle: {fontSize: scaleFontSize(17)}}}
      />
      <Stack.Screen
        name={Routes.MyAccount}
        component={MyAccount}
        options={{
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'My Account',
        }}
      />

    
      {/* Email entry screen */}

      <Stack.Screen
        name={Routes.EmailEntry}
        component={EmailEntry}
        options={{
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Login',
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />

      {/* password entry screen */}

      <Stack.Screen
        name={Routes.PasswordEntry}
        component={PasswordEntry}
        options={{
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Login',
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.Signup}
        component={Signup}
        options={{
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: () => null,
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.SignupEmail}
        component={SignupEmail}
        options={{
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Almost done !',
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.Mobilelogin}
        component={LoginMobile}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(15)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.OtpScreen}
        component={Otpscreen}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.OtpScreenNewuser}
        component={OtpScreenNewuser}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.EmailOtpScreen}
        component={EmailOtpScreen}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.EmailOtpVerification}
        component={EmailOtpVerification}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name={Routes.ForgotPassword}
        component={ForgotPassword}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.ResetPassword}
        component={ResetPassword}
        options={{
          headerTitle: () => null,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerStyle: {
            backgroundColor: '#f9b000',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={ChangePassword}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Change password',
        })}
      />

      <Stack.Screen
        name={Routes.OrderPlaced}
        component={OrderPlaced}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="SavedAddress"
        component={SavedAddress}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Order summary',
        })}
      />

      <Stack.Screen
        name="OrderTracking"
        component={OrderTracking}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Order details',
        })}
      />

      {/* <Stack.Screen
        name="Checkoutform"
        component={Checkoutform}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Add delivery Address',
        })}
      /> */}
      <Stack.Screen
        name="Checkoutform"
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Add delivery Address',
        })}
        component={Checkoutform} // ✅ No need for ProtectedRoute
      />
      <Stack.Screen
        name="SelectAddress"
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Select Delivery Address',
        })}
        component={SelectAddress} 
      />
      <Stack.Screen
        name="BellNotification"
        component={BellNotification}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Notifications',
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
         options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Contact"
        component={Contact}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Contact us',
        })}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Get help',
        })}
      />
      <Stack.Screen
        name="Privacypolicy"
        component={Privacypolicy}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Privacy policy',
        })}
      />
      <Stack.Screen
        name="NoRecords"
        component={NoRecords}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Products',
        })}
      />
      <Stack.Screen
        name="Coupon"
        component={Coupon}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'Apply Coupon',
        })}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
          headerTitle: 'About us',
        })}
      />
    </Stack.Navigator>
  );
};
