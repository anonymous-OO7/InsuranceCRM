import React, {useState, useEffect,useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {axiosrequest} from '../../assets/utils/handler';
import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';
import { useFocusEffect } from '@react-navigation/native';


import {NameSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Counter from '../../components/common/Counter';
import SearchIcon from '../../assets/svgs/searchicon.svg';

import {COLORS, Colors} from '../../assets/colors.js';

import {windowWidth} from '../../assets/utils/Dimensions';
import ListView from '../../components/molecules/ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const HomeScreen = props => {
  const [userInfo, setUserInfo] = useState(null);
  const [clientlist, setClientlist] = useState([]);

  console.log(props, 'PROPSS');

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');

      console.log(jsonValue, 'USERINFO in homescreen');

      if (jsonValue != null) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
        // Function to run when the screen is focused
        const onFocus = () => {
            console.log('Screen is focused');
            // Your focus-related logic here

            console.log("RUNNING USEEFFECT")
   

            loadUserInfo();
        
            getclients();
        };

        onFocus();

        return () => {
            // Optional: Any cleanup logic goes here
        };
    }, [])
);


  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getclients = async () => {
    console.log('fetchig OF CLIENT!!');

    try {
      // Block of code to try
      let endpoint = `/client`;
      const res = await axiosrequest('get', {}, endpoint);

      console.log('Response got in fetcings clints--> ', res.data);

      if (res != '' && res.status == 200) {
        // props.navigation.navigate('OtpVerify', { email: email });
        setClientlist(res?.data?.data);
      } else {
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');
      console.log(err, 'catch block of api');
    }
  };

  function getFirstAndLastCharacters(name) {

    try {
      const words = name.split(' ');
      if (words.length === 1) {
          return words[0][0].toUpperCase();
      }
      const firstChar = words[0][0].toUpperCase();
      const lastChar = words[words.length - 1][0].toUpperCase();
      return firstChar + lastChar;
      
    } catch (error) {
      
      console.log("EERO")
    }
  

}

const namelogo = getFirstAndLastCharacters(userInfo?.agency_name)

console.log(namelogo,"AGENCYYY NAME")

const getBackgroundColor = (status) => {
  switch (status) {
    case 'new_lead':
      return '#E3CBCB';
    case 'active':
      return '#DCE5C2';
    case 'in_progress':
      return '#BCD7EB';
    case 'cold_lead':
      return '#DFCDE2';
    default:
      return 'gray'; // Default color if none of the conditions are met
  }
};


  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      {/* <ScrollView automaticallyAdjustKeyboardInsets={true}> */}

      <View style={HomeScreenStyle.subcontainer}>
        <View style={HomeScreenStyle.nameCtn}>
          <TouchableOpacity
            onPress={() => {
              // props.props.navigation.dispatch(DrawerActions.openDrawer());
              props.props.navigation.openDrawer();
            }}
            style={[HomeScreenStyle.profileButton,{ backgroundColor:   "#007FFF" }]}>
          
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={HomeScreenStyle.profileText}>{namelogo}</Text>
        </View>
          </TouchableOpacity>

          <Text style={HomeScreenStyle.nameText}>{userInfo?.agency_name}</Text>
        </View>

        <View style={HomeScreenStyle.counterCtn}>
          <Counter
            countertitle="Total Clients"
            countervalue={clientlist.length}
            buttonctn={HomeScreenStyle.counterlight}
            clientstyle={HomeScreenStyle.totalclienttext}
            clientnumberstyle={HomeScreenStyle.totalclienttext}
            counteractive={false}
          />

          <Counter
            countertitle="Today’s Events"
            countervalue="--"
            buttonctn={HomeScreenStyle.counteractive}
            clientstyle={HomeScreenStyle.eventtext}
            clientnumberstyle={HomeScreenStyle.eventtext}
            counteractive={true}
          />
        </View>

        <View style={HomeScreenStyle.listingMainCtn}>
          <View style={HomeScreenStyle.listingTitleCtn}>
            <Text style={HomeScreenStyle.titleText}>Clients</Text>
            <TouchableOpacity
              onPress={() => {
                props.props.navigation.navigate('AddClient');
              }}>
              <Text style={HomeScreenStyle.addClientText}>
                Add New Client +
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.props.navigation.navigate('SearchScreen', {data: clientlist});
            }}
            style={HomeScreenStyle.searchSection}>
            {/* <TextInput
              style={HomeScreenStyle.searchInput}
              placeholder="Search client"
              placeholderTextColor="#d3d3d3"
              onChangeText={searchString => {}}
              underlineColorAndroid="transparent"
              editable={false}
            /> */}
            <View style={HomeScreenStyle.searchInput}>
              <Text
                style={[
                  HomeScreenStyle.nameText,
                  {
                    fontSize: responsiveFontSize(1.8),
                    color: Colors.textcolor,
                    fontFamily: 'Rubik-Light',
                  },
                ]}>
                Search Client
              </Text>
            </View>

            <TouchableOpacity>
              <SearchIcon />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={HomeScreenStyle.clientlistCtn}>
            <ListView props={props.props} data={clientlist} />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
