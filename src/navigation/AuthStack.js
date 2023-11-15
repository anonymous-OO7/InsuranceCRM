import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AccountSetup from '../screens/AccountSetup/AccountSetup.js';
import DashBoard from '../screens/Dashboard/Dashboard.js';
import ClientInfo from '../screens/ClientInfo/ClientInfo.js';
import AddClient from '../screens/Addnewclient/AddClient.js';





const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,animation: 'slide_from_right'}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AccountSetup" component={AccountSetup} />
      <Stack.Screen name="DashBoard" component={DashBoard} />

      <Stack.Screen name="ClientInfo" component={ClientInfo} />
      <Stack.Screen name="AddClient" component={AddClient} />


    </Stack.Navigator>
  );
};

export default AuthStack;