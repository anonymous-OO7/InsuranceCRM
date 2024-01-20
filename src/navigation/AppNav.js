import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from '../setup/app-context-manager/Authcontext';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../assets/colors';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={Colors.activeprimary} size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
