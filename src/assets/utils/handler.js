import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosrequest = async (method, data, url) => {
  let userInfo = '';

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');

      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  userInfo = await loadUserInfo();

  axios.defaults.baseURL = 'https://api.mypolicymate.in';

  let token = userInfo?.token;
  let Authorization = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
      headers: {
        // "X-custom header" :  "custom",
        'source-type': 'website',
        Authorization: Authorization,
        agent_id: userInfo?.id,
      },
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        resolve(error.response);
      });
  });
};
