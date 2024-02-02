import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {axiosrequest} from '../../assets/utils/handler';
import HomeScreenStyle from './HomeScreenStyle';
import {useFocusEffect} from '@react-navigation/native';
import Counter from '../../components/common/Counter';
import SearchIcon from '../../assets/svgs/searchicon.svg';
import {Colors} from '../../assets/colors.js';
import {windowWidth} from '../../assets/utils/Dimensions';
import ListView from '../../components/molecules/ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import axios from 'axios';
const HomeScreen = props => {
  const [userInfo, setUserInfo] = useState(null);
  const [clientlist, setClientlist] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      console.log(jsonValue , "JSON VALUEEE")

      if (jsonValue != null) {
        setUserInfo(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue) , "JSON VALUEEE after parsing")

      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };


  const fetchData = async () => {
    try {
      // Replace 'https://api.example.com/data' with your actual API endpoint
      const response = await axios.get('https://reactnative.dev/movies.json');

      console.error('API Response: DUMMJYY', response);
      // console.error('API Response DATATAT: DUMMJYY', response.data);

      // const res = await axiosrequest('get', {}, '/movies.json');

      // console.error('API Response DATATAT: DUMMJYY', res);

      // Assuming your API returns a JSON object, access the data property
      
    } catch (error) {
      console.error('API Error:', error);
  
    }

    
  };



  useFocusEffect(
    useCallback(() => {
      // Function to run when the screen is focused
      const onFocus = () => {
        // Your focus-related logic here
        // fetchData()
        loadUserInfo();
        getclients();
      };
      onFocus();
      return () => {
        // Optional: Any cleanup logic goes here
      };
    }, []),
  );

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getclients = async () => {

 



    setIsloading(true);
    try {
      // Block of code to try
      let endpoint = `/client`;

      console.log("HEREEE")
      let res = await axiosrequest('get', {}, endpoint);
      console.log(" afterrr HEREEE")

      setIsloading(false);
      if (res != '' && res.status == 200) {
        // props.navigation.navigate('OtpVerify', { email: email });
        setClientlist(res?.data?.data);
      } else {
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');
      setIsloading(false);
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
      console.log( error ,  'EERO IN HOMESCREEN');
    }
  }

  const namelogo = getFirstAndLastCharacters(userInfo?.agency_name);

  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      <View style={HomeScreenStyle.subcontainer}>
        <View style={HomeScreenStyle.nameCtn}>
          <TouchableOpacity
            onPress={() => {
              // props.props.navigation.dispatch(DrawerActions.openDrawer());
              props.props.navigation.openDrawer();
            }}
            style={[
              HomeScreenStyle.profileButton,
              {backgroundColor: '#007FFF'},
            ]}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            countervalue="0"
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
              props.props.navigation.navigate('SearchScreen', {
                data: clientlist,
              });
            }}
            style={HomeScreenStyle.searchSection}>
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
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  color={Colors.activeprimary}
                  size={'large'}
                />
              </View>
            ) : (

              <View style={{backgroundColor:"white",height:responsiveHeight(50)}}>
                              <ListView props={props.props} data={clientlist} />

                </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
