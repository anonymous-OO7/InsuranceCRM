import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsloading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setIsloading(true);
    setUserToken('jgsh');
    AsyncStorage.setItem('userToken', 'dfsgvs');
    setIsloading(false);
  };

  const logout = () => {
    setIsloading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userinfo');
    setIsloading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsloading(true);
      const userinfoStr = await AsyncStorage.getItem('userinfo');
      const userinfo = JSON.parse(userinfoStr); // Convert string to JSON object

      if (
        userinfoStr != null &&
        userinfo?.mobile !== '' &&
        userinfo?.agency_name !== ''
      ) {
        setUserToken(userinfo.token);
        setIsloading(false);
      } else {
        logout();
        setIsloading(false);
      }
    } catch (e) {
      logout();

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
