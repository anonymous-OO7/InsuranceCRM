import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../assets/colors';

const InputBox = ({
  props,
  inputplaceholder = 'default placeholder',
  onChangeText = text => {
    console.log('Default On texthandler  ' + text);
  },
  keyboardtype = 'default',
  onfocushandler = () => {},
  value,
}) => {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        style={InputBoxstyles.textInput}
        placeholder={inputplaceholder}
        keyboardType={keyboardtype}
        placeholderTextColor={Colors.textcolor}
        onFocus={onfocushandler}
        value={value}
      />
    </View>
  );
};

const InputBoxstyles = StyleSheet.create({
  textInput: {
    // marginTop: responsiveHeight(1),
    height: responsiveHeight(5),
    width: responsiveWidth(80),
    borderBottomColor: 'white',
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: Colors.textcolor,
    color: 'black',
  },
});

export default InputBox;
