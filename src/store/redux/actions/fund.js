import {
  ADD_FUND,
  DELETE_FUND,
  INITIALIZE_DATA,
  SET_TOKEN,
  SET_WATCHDATA,
  SET_USERID,
  SET_GENDER,
  SET_MOBILE,
  SET_PIN,
  SET_KYCDATA,
  SET_VIDEOOTP,
} from './types';

// export const addFund = (fund) => {
//     return (dispatch) =>{
//         dispatch({
//             type:ADD_FUND,
//             payload:fund
//         })
//     }
// };

export const addFund = fund => {
  return {
    type: ADD_FUND,
    payload: fund,
  };
};

// export const deleteFund = (fund) => {

//     return (dispatch) => {
//         dispatch({
//             type:DELETE_FUND,
//             payload:fund
//         })
//     }
// };

export const deleteFund = fund => {
  return {
    type: DELETE_FUND,
    payload: fund,
  };
};

export const initializeData = data => {
  return {
    type: INITIALIZE_DATA,
    payload: data,
  };
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setPin = pin => {
  return {
    type: SET_PIN,
    payload: pin,
  };
};

export const setUserid = user_id => {
  return {
    type: SET_USERID,
    payload: user_id,
  };
};

export const setGender = gender => {
  return {
    type: SET_GENDER,
    payload: gender,
  };
};
export const setMobile = mobile => {
  return {
    type: SET_MOBILE,
    payload: mobile,
  };
};

export const setWatchData = data => {
  return {
    type: SET_WATCHDATA,
    payload: data,
  };
};

export const setKycData = data => {
  return {
    type: SET_KYCDATA,
    payload: data,
  };
};

export const setVideoOtp = data => {
  return {
    type: SET_VIDEOOTP,
    payload: data,
  };
};
