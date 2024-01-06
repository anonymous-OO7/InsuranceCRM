import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import OnboardingStyle from './OnboardingStyle';

import LogoViewer from '../../components/common/LogoViewer';
import {axiosrequest} from '../../assets/utils/handler';
import {
  AppleSvg,
  GoogleSvg,
  LoginImage,
  LogoImage,
} from '../../assets/svgs/SvgImages';
import Button from '../../components/common/Button';
import ButtonIcon from '../../components/common/ButtonIcon';
import InputBox from '../../components/common/InputBox';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {showToast} from '../../assets/utils/Helpers';
const {width, height} = Dimensions.get('window');

const OnboardingScreen = (props, {navigation}) => {
  const [email, setEmail] = useState('');
  const [isValid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const emailTextHandler = text => {
    console.log('EMAIL TEXT HANDLER' + text);

    // setEmail(text);

    const isEmail = validateEmail(text);

    if (isEmail == true) {
      console.log('email if in correct format');
      setEmail(text);
      setValid(true);
    } else {
      setValid(false);
      console.log('email if in not in  correct format');
    }
  };

  const onfocus = () => {
    console.log('ONFOCUS HANDLER', scrollViewRef);
    scrollViewRef.current?.scrollTo({y: 500, animated: true});
  };

  function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  const callOtp = async () => {
    // props.navigation.navigate('OtpVerify', {email: email});

    console.log('CALLING OTP API');
    setLoading(true)

    try {
      // Block of code to try
      let endpoint = `/login`;
      const res = await axiosrequest('post', {email: email}, endpoint);
      setLoading(false)

      console.log('Response got in email otp--> ', res);

      if (res != '' && res.status == 200) {
        showToast(res?.data?.message);
        props.navigation.navigate('OtpVerify', {email: email});
      } else {
        // showToast(res?.data?.message);
        showToast('Some error occured');
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');

      console.log(err, 'catch block of api');
    }
  };

  return (
    <SafeAreaView style={OnboardingStyle.container}>
      <ScrollView automaticallyAdjustKeyboardInsets={true} ref={scrollViewRef}>
        <LogoViewer
          Logosource={LogoImage}
          containerstyle={OnboardingStyle.logoImgContainer}
          logostyle={OnboardingStyle.logoImg}
        />
        <LogoViewer
          Logosource={LoginImage}
          containerstyle={OnboardingStyle.loginImgContainer}
          logostyle={OnboardingStyle.loginImg}
        />

        <Text style={OnboardingStyle.loginText}>Log in</Text>
        <Text style={OnboardingStyle.emailText}>Email ID</Text>

        <View style={{marginLeft: responsiveWidth(8)}}>
          <InputBox
            inputplaceholder={'Enter Email ID'}
            onChangeText={emailTextHandler}
            onfocushandler={onfocus}
          />
        </View>

        <Button
          btntext="Send OTP"
          disabled={email != '' && isValid == true ? false : true}
          onclick={() => {
            callOtp();
            // props.navigation.navigate('AccountSetup');
          }}
          buttonctn={OnboardingStyle.buttonCtn}
          loading={loading}
        />

        {/* <View
          style={[OnboardingStyle.buttonCtn, {marginTop: responsiveHeight(7)}]}>
          <ButtonIcon
            disabled={false}
            Logosource={AppleSvg}
            title={'Sign in with Google'}
          />
        </View>

        <View style={[OnboardingStyle.buttonCtn, {marginTop: 0}]}>
          <ButtonIcon
            disabled={false}
            Logosource={GoogleSvg}
            title={'Sign in with Apple'}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
