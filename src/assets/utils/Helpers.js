// helpers.js

import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';

export const formatNumber = number => {
  // Implementation of number formatting
  return 2;
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const showToastNew = (type, heading, message) => {
  if (message != undefined && message != null && message != '') {
    Toast.show({
      type: type,
      text1: heading,
      text2: message,
    });
  } else {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong!',
    });
  }
};

export const showToast = message => {
  if (message != undefined && message != null && message != '') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    ToastAndroid.show('Some error occurred!!', ToastAndroid.SHORT);
  }
};
