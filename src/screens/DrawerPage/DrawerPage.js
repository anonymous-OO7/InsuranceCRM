import * as React from 'react';
import {Button, View, Text,StyleSheet,Dimensions,SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DashBoard from '../Dashboard/Dashboard';
import CustomDrawer from '../../components/molecules/CustomDrawer';
import { Bank, Help, Home } from '../../assets/svgs/SvgImages';
import { Colors } from '../../assets/colors';
import LogoViewer from '../../components/common/LogoViewer';
import { ComingSoon } from '../../assets/svgs/SvgImages';
import TopBack from '../../components/molecules/TopBack';
const windowWidth = Dimensions.get('window').width;

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { windowHeight } from '../../assets/utils/Dimensions';


const DrawerPage = props => {
  const Drawer = createDrawerNavigator();

  console.log('INSIDE DRAWER');
  return (
    <Drawer.Navigator
    initialRouteName="DashBoard"
    drawerContent={props => <CustomDrawer {...props} />}
  
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: Colors.activeprimary,
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }}
  >
    <Drawer.Screen 
      name="DashBoard" 
      component={DashBoard} 
      options={{
        drawerIcon: ({color}) => (
          <Home color={color} />
        ),
        drawerItemStyle: { height: 0 }, // Hide "DashBoard" from the drawer
        unmountOnBlur: true, // Unmount the screen when it's not focused
      }} 
    />
    <Drawer.Screen 
      name="Pricing" 
      component={PricingScreen}  
      options={{
        drawerIcon: ({color}) => (
          <Bank color={color} />
        ),
      }}
    />
    {/* <Drawer.Screen 
      name="Help" 
      component={HelpScreen}  
      options={{
        drawerIcon: ({color}) => (
          <Help color={color} />
        ),
      }}
    /> */}
  </Drawer.Navigator>
  
  );
};

function HelpScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function PricingScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
        {/* <Text style={styles.notiText}>No insights availaible</Text> */}
        <TopBack  heading='Pricing' props={props}/>
        <LogoViewer
          Logosource={ComingSoon}
          containerstyle={styles.loginImgContainer}
          logostyle={styles.loginImg}
        />
      {/* <LottieView style={styles.animationCtn} source={require('../../assets/animations/notification2.json')} autoPlay loop /> */}

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
    height:windowHeight,
    alignItems:"center",
    
  },
  animationCtn:{
    backgroundColor:"white",
    height:responsiveHeight(40),
    width:windowWidth
  },
  notiText:{
    fontSize:responsiveFontSize(2.2),
    fontFamily:'Rubik-Regular',
    color:"black",
    width:windowWidth,
    backgroundColor:"white",
    textAlign:"center"
  },
  loginImgContainer:{
    flex:1,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
  },
  loginImg:{
    height:responsiveHeight(31.7),
    width:responsiveHeight(40.52),

  },
});


export default DrawerPage;
