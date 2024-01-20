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
import LogoViewer from '../common/LogoViewer';

const TopBack = ({props, heading = 'Add new client'}) => {
  console.log(props, 'props got in topback', '---headin', heading);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topCtn}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <LogoViewer
            Logosource={BackSvg}
            containerstyle={styles.logoImgContainer}
            logostyle={styles.logoImg}
          />
        </TouchableOpacity>

        <Text style={styles.headText}>{heading}</Text>
      </View>
    </SafeAreaView>
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
});

export default TopBack;
