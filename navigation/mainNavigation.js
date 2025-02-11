import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import {scaleFontSize} from '../assets/styles/Scaling';
import Cart from '../screens/Cart/Cart';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  faArrowLeft,
  faCartShopping,
  faHome,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Products from '../screens/Products/Products';
import Orders from '../screens/Orders/Orders';
import {faClipboard} from '@fortawesome/free-regular-svg-icons';
import {TouchableOpacity} from 'react-native';
import Login from '../screens/Login/Login';
import LoginMobile from '../screens/Login/LoginMobile';
import Otpscreen from '../screens/Otpscreen/Otpscreen';

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

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') iconName = faHome;
          else if (route.name === 'Cart') iconName = faCartShopping;
          else if (route.name === 'Products') iconName = faList;
          else if (route.name === 'Orders') iconName = faClipboard;

          const iconSize = 18;
          return (
            <FontAwesomeIcon icon={iconName} size={iconSize} color={color} />
          );
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
      <Tab.Screen name="Products" component={Products} options={({navigation})=>({
          headerTitleStyle:{fontSize:scaleFontSize(17)},
          headerLeft:()=><CustomBackButton navigation={navigation}/>
      })}/>
      <Tab.Screen name="Orders" component={Orders} options={({navigation})=>({
          headerTitleStyle:{fontSize:scaleFontSize(17)},
          headerLeft:()=><CustomBackButton navigation={navigation}/>
      })}/>
      <Tab.Screen name="Cart" component={Cart} options={({navigation})=>({
          headerTitleStyle:{fontSize:scaleFontSize(17)},
          headerLeft:()=><CustomBackButton navigation={navigation}/>
      })}/>
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

      {/* Adding Screens in StackNavigator with Back Button */}
      <Stack.Screen
        name="Products"
        component={Products}
        options={({navigation}) => ({
          headerLeft: () => <CustomBackButton navigation={navigation} />,
          headerTitleStyle: {fontSize: scaleFontSize(17)},
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

      <Stack.Screen name={Routes.Login} component={Login} options={{
        headerTitleStyle:{fontSize:scaleFontSize(17)},headerStyle:{backgroundColor:'#f9b000',elevation:0,shadowOpacity:0}}
      } />
      <Stack.Screen name={Routes.Mobilelogin} component={LoginMobile} options={{headerTitle:()=>null,
        headerTitleStyle:{fontSize:scaleFontSize(17)},headerStyle:{backgroundColor:'#f9b000',elevation:0,shadowOpacity:0}}
      } />
      <Stack.Screen name={Routes.OtpScreen} component={Otpscreen} options={{headerTitle:()=>null,
        headerTitleStyle:{fontSize:scaleFontSize(17)},headerStyle:{backgroundColor:'#f9b000',elevation:0,shadowOpacity:0}}
      } />
    </Stack.Navigator>
  );
};
