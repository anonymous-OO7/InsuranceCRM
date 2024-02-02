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
      console.log(e, "Error in reading inside handler");
    }
  };

  userInfo = await loadUserInfo();
  axios.defaults.baseURL = 'https://api.mypolicymate.in';
  let token = userInfo?.token;
  let Authorization = `Bearer ${token}`;

  try {
    let response;

    if (method === 'get') {
      response = await axios.get(url, {
        headers: {
          'source-type': 'website',
          Authorization: Authorization,
          agent_id: userInfo?.id,
        },
      });
    } else if (method === 'post') {
      response = await axios.post(url, data, {
        headers: {
          'source-type': 'website',
          Authorization: Authorization,
          agent_id: userInfo?.id,
        },
      });
    } else if (method === 'put') {
      response = await axios.put(url, data, {
        headers: {
          'source-type': 'website',
          Authorization: Authorization,
          agent_id: userInfo?.id,
        },
      });
    } else if (method === 'patch') {
      response = await axios.patch(url, data, {
        headers: {
          'source-type': 'website',
          Authorization: Authorization,
          agent_id: userInfo?.id,
        },
      });
    } else {
      throw new Error('Unsupported HTTP method');
    }

    console.log(response, "Success Response");
    return response;
  } catch (error) {
    console.log(error.response, "Error Response");
    return error.response;
  }
};
