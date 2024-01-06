import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsloading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  console.log('  running authcontext js!');

  const login = () => {
    setIsloading(true);
    setUserToken('jgsh');
    AsyncStorage.setItem('userToken', 'dfsgvs');
    setIsloading(false);
  };

  const logout = () => {
    console.log('  logingg out!');

    setIsloading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userinfo');
    setIsloading(false);
    console.log('  loggedd out!');
  };

  const isLoggedIn = async () => {
    try {
      console.log('checking logging in!');
      setIsloading(true);
      const userinfoStr = await AsyncStorage.getItem('userinfo');
      console.log('user info got!' + userinfoStr);

      const userinfo = JSON.parse(userinfoStr); // Convert string to JSON object

      if (
        userinfoStr != null &&
        userinfo?.mobile !== '' &&
        userinfo?.agency_name !== ''
      ) {
        setUserToken(userinfo.token);
        console.log('success logging in!' + userinfo.token);
        setIsloading(false);
      } else {

        console.log('failure in logging in!' + userinfo.token);
        logout()
        setIsloading(false);
      }
    } catch (e) {
      console.log('error in logging in!', e);
      logout()

      setIsloading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
