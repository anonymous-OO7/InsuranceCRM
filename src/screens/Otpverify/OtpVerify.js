import React, {useEffect, useState} from 'react';
import Button from '../../components/common/Button';
import {axiosrequest} from '../../assets/utils/handler';
import {OtpInput} from 'react-native-otp-entry';
import {jwtDecode} from 'jwt-decode';

import {decode} from 'base-64';
global.atob = decode;

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {LogoImage} from '../../assets/svgs/SvgImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoViewer from '../../components/common/LogoViewer';
import {Colors} from '../../assets/colors';

const OtpVerify = props => {
  const [otp, setOtp] = useState('');
  const [otploading, setOtpLoading] = useState(false);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const callOtp = async () => {
    try {
      // Block of code to try
      setOtpLoading(true);
      let endpoint = `/otp`;

      const res = await axiosrequest(
        'post',
        {email: props.route.params.email, otp: otp},
        endpoint,
      );
      setOtpLoading(false);
      // token and success  message
      if (res != '' && res.status == 200) {
        const decoded = jwtDecode(res?.data?.token);
        decoded['token'] = res?.data?.token;
        const jsonValue = JSON.stringify(decoded);
        await AsyncStorage.setItem('userinfo', jsonValue);
        showToast('Success!');
        if (
          decoded?.name &&
          decode?.name != '' &&
          decoded?.email &&
          decode?.email != '' &&
          decoded?.agency_name &&
          decode?.agency_name != '' &&
          decoded?.mobile &&
          decode?.mobile != ''
        ) {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'DrawerPage'}],
          });
        } else {
          props.navigation.navigate('AccountSetup', {
            email: props.route.params.email,
          });
        }
      } else {
        showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');
    }
  };

  return (
    <View style={styles.mainCtn}>
      <View style={styles.innerCtn}>
        <LogoViewer
          Logosource={LogoImage}
          containerstyle={styles.logoImgContainer}
          logostyle={styles.logoImg}
        />

        <Text style={styles.otpText}>
          Enter the 4 digit OTP which you have received on your email id
        </Text>

        <View style={styles.otpcontainer}>
          <OtpInput
            numberOfDigits={4}
            onTextChange={text => {
              setOtp(text);
            }}
            theme={{
              pinCodeTextStyle: styles.otpEntryText,
            }}
          />

          <View style={styles.resendCtn}>
            <Text style={[styles.otpText, {width: responsiveWidth(40)}]}>
              Code not received?
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.otpText,
                  styles.resendText,
                  {width: responsiveWidth(20), textAlign: 'left'},
                ]}>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.submitButton}>
          <Button
            disabled={otp.length >= 4 ? false : true}
            onclick={callOtp}
            buttonctn={styles.buttonctn}
            btntext={'Submit OTP'}
            loading={otploading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCtn: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  fieldCtn: {
    marginLeft: responsiveWidth(8),
  },
  innerCtn: {
    backgroundColor: 'white',
    width: responsiveWidth(90),
    height: responsiveHeight(100),
    alignItems: 'center',
  },
  logoImgContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: responsiveHeight(16.7),
    width: responsiveHeight(20.52),
  },
  otpText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3.4),
    color: '#333333',
    backgroundColor: 'white',
    marginTop: responsiveHeight(3.79),
    textAlign: 'center',
    width: responsiveWidth(80),
  },
  otpcontainer: {
    width: responsiveWidth(80),
    marginTop: responsiveHeight(3.79),
  },
  submitButton: {
    position: 'absolute',
    bottom: responsiveHeight(8),
  },
  buttonctn: {
    backgroundColor: 'white',
    width: responsiveWidth(80),
  },
  resendText: {
    color: Colors.activeprimary,
  },
  resendCtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpEntryText: {
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3.4),
    color: '#333333',
    backgroundColor: 'white',
  },
});

export default OtpVerify;
