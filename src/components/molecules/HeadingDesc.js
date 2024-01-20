import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const HeadingDesc = ({props, mainCtn}) => {
  return (
    <View style={mainCtn}>
      <Text style={HeadingDescstyles.headingText}>Setting up your account</Text>
      <Text style={HeadingDescstyles.DescText}>
        A few details to setup a personalized account
      </Text>
    </View>
  );
};

const HeadingDescstyles = StyleSheet.create({
  headingText: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginLeft: responsiveWidth(8),
    marginBottom: responsiveHeight(0.4),
  },
  DescText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginLeft: responsiveWidth(8),
    marginBottom: responsiveHeight(0.4),
    opacity: 0.4,
  },
});

export default HeadingDesc;
