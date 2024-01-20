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
import InputBox from '../common/InputBox';

const HeadingBox = ({
  props,
  headingText,
  inputplaceholder = 'box placeholder',
  containerstyle,
  onInputChange = text => {
  },
  keyboardtype = 'default',
  inputvalue
}) => {
  console.log(inputvalue , "INOUT VALUe")
  return (
    <View style={containerstyle}>
      <Text style={HeadingBoxstyles.headingText}>{headingText}</Text>

      <InputBox
        inputplaceholder={inputplaceholder}
        onChangeText={onInputChange}
        keyboardtype= {keyboardtype}
        value={inputvalue}
      />
    </View>
  );
};

const HeadingBoxstyles = StyleSheet.create({
  headingText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Light',
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginTop: responsiveHeight(3.7),
  },
});

export default HeadingBox;
