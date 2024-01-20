import React from 'react';
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LogoViewer from '../../../components/common/LogoViewer';
import {ComingSoon} from '../../../assets/svgs/SvgImages';
const windowWidth = Dimensions.get('window').width;

const Beneficiary = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LogoViewer
        Logosource={ComingSoon}
        containerstyle={styles.loginImgContainer}
        logostyle={styles.loginImg}
      />
    </SafeAreaView>
  );
};

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
export default Beneficiary;
