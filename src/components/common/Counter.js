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
import WatchlistIcon from '../../assets/images/tabbar/WatchlistIcon';
import Watchlist from '../../assets/images/Watchlist.svg';
import LogoViewer from './LogoViewer';
import {WatchSvg, ClientSvg} from '../../assets/svgs/SvgImages';
import {animated, useSpring} from '@react-spring/native';

const Counter = ({
  disabled = true,
  onclick = () => {
    console.log('checking  default logingg in!');
  },
  buttonctn,
  clientstyle,
  clientnumberstyle,
  countertitle = 'Button',
  countervalue = 'Button',
  counteractive = true,
}) => {
  const props = useSpring({number: countervalue, from: {number: 0}});

  return (
    <View style={[Counterstyles.container, buttonctn]}>
      <View>
        {counteractive == true ? (
          <LogoViewer
            Logosource={WatchSvg}
            containerstyle={[
              Counterstyles.logoImgContainer,
              {backgroundColor: buttonctn.backgroundColor},
            ]}
            logostyle={
              counteractive == true
                ? Counterstyles.logoImg
                : Counterstyles.logoimg2
            }
          />
        ) : (
          <LogoViewer
            Logosource={ClientSvg}
            containerstyle={[
              Counterstyles.logoImgContainer,
              {backgroundColor: buttonctn.backgroundColor},
            ]}
            logostyle={
              counteractive == true
                ? Counterstyles.logoImg
                : Counterstyles.logoimg2
            }
          />
        )}
      </View>

      <View style={Counterstyles.textCtn}>
        <Text style={[Counterstyles.clientText, clientstyle]}>
          {countertitle}
        </Text>
        <Text style={[Counterstyles.clientNumberText, clientnumberstyle]}>
          {/* {countervalue} */}

          <animated.Text style={{fontSize: 24}}>
            {props.number.to(n => n.toFixed(0))}
          </animated.Text>
        </Text>
      </View>
    </View>
  );
};

const Counterstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: responsiveHeight(1),
    margin: responsiveWidth(3),
    padding: responsiveWidth(1),
  },
  textCtn: {},
  clientText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    marginTop: responsiveHeight(1),
  },
  clientNumberText: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Rubik-Medium',
    color: 'black',
    textAlign: 'center',
  },
  logoImgContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    fill: 'white',
  },
  logoimg2: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    fill: 'black',
  },
});

export default Counter;
