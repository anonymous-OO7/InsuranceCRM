import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {BackSvg} from '../../assets/svgs/SvgImages';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;
import {Colors} from '../../assets/colors';
import LottieView from 'lottie-react-native';
import LogoViewer from '../common/LogoViewer';
import {ComingSoon} from '../../assets/svgs/SvgImages';
import TopBack from './TopBack';
const Notification = ({props}) => {
  console.log(props, 'props got in ');

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.notiText}>No insights availaible</Text> */}
      <TopBack heading="Insight" props={props} />
      <LogoViewer
        Logosource={ComingSoon}
        containerstyle={styles.loginImgContainer}
        logostyle={styles.loginImg}
      />
      {/* <LottieView style={styles.animationCtn} source={require('../../assets/animations/notification2.json')} autoPlay loop /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationCtn: {
    backgroundColor: 'white',
    height: responsiveHeight(40),
    width: windowWidth,
  },
  notiText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  loginImgContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImg: {
    height: responsiveHeight(31.7),
    width: responsiveHeight(40.52),
  },
});

export default Notification;
