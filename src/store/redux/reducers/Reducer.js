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
} from '../actions/types';

const initialState = {
  initialData: [],
  count: 0,
  token: null,
  watchlist: [],
  user_id: null,
  gender: null,
  mobile: null,
  pin: null,
  kyc_data: [],
  video_Otp: null,
};

const fundReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FUND:
      return {
        ...state,
        count: state.count + 1000,
      };

    case DELETE_FUND:
      return {
        ...state,
        count: state.count - 1000,
      };

    case INITIALIZE_DATA:
      return {
        ...state,
        initialData: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_WATCHDATA:
      return {
        ...state,
        watchlist: action.payload,
      };

    case SET_USERID:
      return {
        ...state,
        user_id: action.payload,
      };

    case SET_GENDER:
      return {
        ...state,
        gender: action.payload,
      };

    case SET_MOBILE:
      return {
        ...state,
        mobile: action.payload,
      };
    case SET_PIN:
      return {
        ...state,
        pin: action.payload,
      };
    case SET_KYCDATA:
      return {
        ...state,
        kyc_data: action.payload,
      };
    case SET_VIDEOOTP:
      return {
        ...state,
        video_Otp: action.payload,
      };

    default:
      return state;
  }
};

export default fundReducer;
