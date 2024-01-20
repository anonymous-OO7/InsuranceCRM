import React, {useState, useRef} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import OnboardingStyle from './OnboardingStyle';
import LogoViewer from '../../components/common/LogoViewer';
import {axiosrequest} from '../../assets/utils/handler';
import {LoginImage, LogoImage} from '../../assets/svgs/SvgImages';
import Button from '../../components/common/Button';
import InputBox from '../../components/common/InputBox';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {showToast} from '../../assets/utils/Helpers';
import Toast from 'react-native-toast-message';

const OnboardingScreen = (props, {navigation}) => {
  const [email, setEmail] = useState('');
  const [isValid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const emailTextHandler = text => {
    // setEmail(text);
    const isEmail = validateEmail(text);
    if (isEmail == true) {
      setEmail(text);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onfocus = () => {
    scrollViewRef.current?.scrollTo({y: 500, animated: true});
  };

  function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  const callOtp = async () => {
    setLoading(true);
    try {
      // Block of code to try
      let endpoint = `/login`;
      const res = await axiosrequest('post', {email: email}, endpoint);
      setLoading(false);

      if (res != '' && res.status == 200) {
        showToast(res?.data?.message);
        props.navigation.navigate('OtpVerify', {email: email});
        showToast();
      } else {
        showToast('Some error occured');
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');
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
      <Toast />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
