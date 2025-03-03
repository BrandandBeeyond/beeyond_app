import React, {useState} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import {globalStyle} from '../../assets/styles/globalStyle';
import {ProfileStyle} from '../Profile/Style';
import {useDispatch, useSelector} from 'react-redux';
import {accountStyle} from './Style';
import LockIcon from 'react-native-vector-icons/Feather';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import {logoutUser} from '../../redux/actions/UserAction';

const MyAccount = ({navigation}) => {
  const {user} = useSelector(state => state.user) || {};

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || '');

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabs'}],
      });
    } catch (error) {
      console.error('error logging out', error);
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
                  <Pressable style={accountStyle.profileBtn}>
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
                ]}>
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
                  globalStyle.cg5,
                ]}
                onPress={handleLogout}>
                <LogoutIcon name="logout" color={'#111'} size={20} />
                <Text style={accountStyle.utilText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;
