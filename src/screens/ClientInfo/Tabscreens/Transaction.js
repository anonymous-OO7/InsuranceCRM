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
import LottieView from 'lottie-react-native';
import LogoViewer from '../../../components/common/LogoViewer';
import { ComingSoon } from '../../../assets/svgs/SvgImages';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Transaction = () => {
  return (
    <SafeAreaView style={styles.container}>

      <LogoViewer
      Logosource={ComingSoon}
      containerstyle={styles.loginImgContainer}
      logostyle={styles.loginImg}
    />
  </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationCtn: {
    backgroundColor: 'white',
    height: responsiveHeight(30),
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
  loginImgContainer:{
    flex:1,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
  },
  loginImg:{
    height:responsiveHeight(31.7),
    width:responsiveHeight(40.52),
  },
});
export default Transaction