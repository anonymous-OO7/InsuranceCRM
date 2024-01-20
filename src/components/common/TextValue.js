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

const TextValue = ({title = 'Button', value = 'Button'}) => {
  console.log(title, value, 'VALUES IN TEXT');
  return (
    <View>
      <Text style={styles.textTitle}>{title}</Text>

      <Text style={styles.textValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textCtn: {},
  clientText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3),
    color: 'black',
  },
  clientNumberText: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Rubik-Medium',
    color: 'black',
  },
  textTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Light',
    color: 'black',
    marginTop: responsiveHeight(2),
  },
  textValue: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },
});

export default TextValue;
