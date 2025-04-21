import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {ProfileStyle} from '../Profile/Style';
import {useDispatch, useSelector} from 'react-redux';
import {accountStyle} from './Style';
import LockIcon from 'react-native-vector-icons/Feather';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import {logoutUser} from '../../redux/actions/UserAction';
import {CartStyle} from '../Cart/Style';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {LoginStyle} from '../Login/Style';

const MyAccount = ({navigation}) => {
  const {user} = useSelector(state => state.user) || {};

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const dispatch = useDispatch();

  const handleEditUser = () => {
    setModalVisible(true);
  };
  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await dispatch(logoutUser());
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
    } catch (error) {
      console.error('error logging out', error);
    } finally {
      setLoadingLogout(false);
    }
  };
  return (
    <SafeAreaView style={[globalStyle.flex, globalStyle.bgTheme]}>
      <ScrollView>
        <View
          style={[globalStyle.px10, globalStyle.py10, globalStyle.relative]}>
          <Pressable style={ProfileStyle.userAccount}>
            <View style={[globalStyle.drow, globalStyle.cg5, globalStyle.p5]}>
              <View style={globalStyle.avatar}>
                <View style={globalStyle.avatarInner}>
                  <Image
                    source={require('../../assets/images/man.png')}
                    style={ProfileStyle.Profileimg}
                  />
                </View>
              </View>
              <View style={[globalStyle.dcol]}>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.justifyBetween,
                    globalStyle.relative,
                  ]}>
                  <View>
                    <Text style={[globalStyle.small, globalStyle.textLight]}>
                      Name
                    </Text>
                    <Text style={[globalStyle.userName, globalStyle.mt5]}>
                      {user?.name || 'Guest'}
                    </Text>
                  </View>
                </View>
                <View style={globalStyle.mt5}>
                  <Pressable
                    style={accountStyle.profileBtn}
                    onPress={handleEditUser}>
                    <Text style={accountStyle.profileBtnText}>
                      Edit profile
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>

          <View style={[globalStyle.mt20]}>
            <View
              style={[
                globalStyle.bgWhite,
                globalStyle.rounded3,
                globalStyle.p8,
                globalStyle.normalBorder,
              ]}>
              <View
                style={[
                  globalStyle.drow,
                  globalStyle.justifyBetween,
                  globalStyle.alignCenter,
                ]}>
                <View>
                  <Text
                    style={[
                      globalStyle.small,
                      globalStyle.fw700,
                      globalStyle.textGray,
                    ]}>
                    Mobile Number
                  </Text>
                  <Text style={[globalStyle.xsSmall, globalStyle.mt3]}>
                    {user?.mobile ? `${user.mobile}` : 'Not Available'}
                  </Text>
                </View>
                {user && user.isVerified ? (
                  <View style={accountStyle.verified}>
                    <Text style={accountStyle.verifiedText}>Verified</Text>
                  </View>
                ) : (
                  <View style={accountStyle.nonverified}>
                    <Text style={accountStyle.nonverifiedText}>unverified</Text>
                  </View>
                )}
              </View>

              <View style={globalStyle.breakable}></View>
              <View style={globalStyle.emailInputUpdate}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  editable={isEditing}
                />
                <Pressable
                  style={accountStyle.editableBtn}
                  onPress={() => setIsEditing(!isEditing)}>
                  <Text style={accountStyle.editableText}>
                    {isEditing ? 'Save' : 'Edit'}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={[
                globalStyle.bgWhite,
                globalStyle.rounded3,
                globalStyle.p8,
                globalStyle.normalBorder,
                globalStyle.mt10,
              ]}>
              <Pressable
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,
                  globalStyle.cg5,
                ]}
                onPress={() => navigation.navigate('ChangePassword')}>
                <LockIcon name="lock" color={'#111'} size={20} />
                <Text style={accountStyle.utilText}>Change password</Text>
              </Pressable>
            </View>
            <View
              style={[
                globalStyle.bgWhite,
                globalStyle.rounded3,
                globalStyle.p8,
                globalStyle.normalBorder,
                globalStyle.mt10,
              ]}>
              <Pressable
                style={[
                  globalStyle.drow,
                  globalStyle.alignCenter,

                  globalStyle.justifyBetween,
                ]}
                onPress={handleLogout}>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.alignCenter,
                    globalStyle.cg5,
                  ]}>
                  <LogoutIcon name="logout" color={'#111'} size={20} />
                  <Text style={accountStyle.utilText}>Logout</Text>
                </View>
                <View>
                  {loadingLogout && (
                    <View>
                      <ActivityIndicator
                        loading={loadingLogout}
                        color={'#000'}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={CartStyle.modalOverlay}>
          <View style={accountStyle.modalContent}>
            <View
              style={[
                globalStyle.drow,
                globalStyle.justifyBetween,
                globalStyle.bgSemiLight,
                globalStyle.p5,
              ]}>
              <View>
                <Text style={[globalStyle.subtext, globalStyle.fwbold]}>
                  Update user name
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <CloseIcon name="closecircle" size={20} />
              </Pressable>
            </View>
            <View style={globalStyle.px10}>
              <View style={[globalStyle.emailInputUpdate, globalStyle.mt20]}>
                {/* <TextInput value={user.name} onChangeText={setEmail} /> */}
              </View>
            </View>

            <View style={[globalStyle.px10, globalStyle.mt10]}>
              <Pressable
                style={[LoginStyle.loginBtn, {backgroundColor: '#010101'}]}>
                {loading ? (
                  <View
                    style={[
                      globalStyle.drow,
                      globalStyle.alignCenter,
                      globalStyle.cg5,
                    ]}>
                    <ActivityIndicator size={20} color={'#fff'} />
                    <Text style={LoginStyle.loginBtnText}>Submit</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={LoginStyle.loginBtnText}>Submit</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyAccount;
