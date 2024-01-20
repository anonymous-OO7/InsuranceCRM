import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '../../setup/app-context-manager/Authcontext';
import LogoViewer from '../common/LogoViewer';
import {windowWidth} from '../../assets/utils/Dimensions';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../assets/colors';
import {Logout, Share} from '../../assets/svgs/SvgImages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      if (jsonValue != null) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  function getFirstAndLastCharacters(name) {
    try {
      const words = name.split(' ');
      if (words.length === 1) {
        return words[0][0].toUpperCase();
      }
      const firstChar = words[0][0].toUpperCase();
      const lastChar = words[words.length - 1][0].toUpperCase();
      return firstChar + lastChar;
    } catch (error) {
      console.log('EERO');
    }
  }

  const namelogo = getFirstAndLastCharacters(userInfo?.agency_name);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.white}}>
        <ImageBackground
          // source={require('../../assets/images/profileimage.png')}
          style={{padding: 20}}>
          {/* <Image
            source={require('../../assets/images/pImage.png')}
            style={{height: 90, width: 80, borderRadius: 40, marginBottom: 10}}
          /> */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#007FFF',
                justifyContent: 'center',
                alignItems: 'center',
                height: responsiveHeight(10),
                width: responsiveHeight(10),
                borderRadius: responsiveHeight(8),
                marginBottom: 10,
              }}>
              <Text style={styles.profileText}>{namelogo}</Text>
            </View>
            <Text
              style={{
                color: Colors.black,
                fontSize: responsiveFontSize(3),
                fontFamily: 'Poppins-Medium',
                marginBottom: 5,
                textAlign: 'center',
              }}>
              {userInfo?.agency_name}
            </Text>

            <Text
              style={{
                color: Colors.text,
                fontSize: responsiveFontSize(1.4),
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
              }}>
              {userInfo?.mobile}
            </Text>
            <Text
              style={{
                color: Colors.text,
                fontSize: responsiveFontSize(1.4),
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                marginBottom: 5,
              }}>
              {userInfo?.email}
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Ionicons name="share-social-outline" size={22} /> */}
            <LogoViewer
              Logosource={Share}
              containerstyle={styles.logoImgContainer}
              logostyle={styles.logoImg}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: Colors.black,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
            // props.navigation.popToTop();
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Onboarding'}],
            });
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Ionicons name="exit-outline" size={22} /> */}
            <LogoViewer
              Logosource={Logout}
              containerstyle={styles.logoImgContainer}
              logostyle={styles.logoImg}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: Colors.black,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
  },
  topCtn: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
    marginTop: responsiveHeight(1),
    alignItems: 'center',
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
  },
  logoImg: {
    height: responsiveHeight(8),
    width: responsiveWidth(6),
  },
  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveHeight(6),
    marginLeft: responsiveWidth(2),
  },
  image: {
    flex: 1,
    transform: [{scale: 1.5}],
  },
  headText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: responsiveWidth(82),
    marginLeft: responsiveWidth(2),
  },
  profileText: {
    fontSize: responsiveFontSize(3.4),
    fontFamily: 'Rubik-Regular',
    color: 'white',
  },
});

export default CustomDrawer;
