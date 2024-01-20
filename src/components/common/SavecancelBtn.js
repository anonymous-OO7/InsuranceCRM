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
import {Colors} from '../../assets/colors';

const SaveCancelBtn = ({
  disabled = false,
  onclick = () => {
    console.log('checking  default logingg in!');
  },
  buttonctn,
  btntext = 'Button',
  onCancel = () => {
    console.log('checking  default cancel in!');
  },
  onSave = () => {
    console.log('checking  default save in!');
  },
}) => {
  return (
    <View style={buttonctn}>
      <View style={Buttonstyles.btnctn}>
        <TouchableOpacity onPress={onCancel} style={Buttonstyles.cancelbtn}>
          <Text style={Buttonstyles.btnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={disabled} onPress={onSave} style={Buttonstyles.savebtn}>
          <Text style={[Buttonstyles.btnText, {color: Colors.white}]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Buttonstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  btnctn: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelbtn: {
    backgroundColor: Colors.white,
    height: responsiveHeight(6.5),
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: responsiveWidth(0.6),
    borderColor: Colors.activeprimary,
    borderRadius: responsiveWidth(3),
  },
  savebtn: {
    backgroundColor: Colors.activeprimary,
    height: responsiveHeight(6.5),
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(3),
  },
  btnText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: Colors.activeprimary,
  },
});

export default SaveCancelBtn;
