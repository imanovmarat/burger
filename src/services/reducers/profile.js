import {
  REG_REQUEST_FAILED,
  REG_REQUEST_SUCCESS,
  SEND_REG_REQUEST,
  SET_USER_AUTHORIZATION_STATUS,
  SEND_USERDATA_REQUEST,
  USERDATA_REQUEST_SUCCESS,
  USERDATA_REQUEST_FAILED, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILED, SEND_LOGOUT_REQUEST
} from "../actions/profile";

const initialState = {
  isAuthorized: false,
  profileRequest: false,
  profileFailed: false,
  getUserDataRequest: false,
  getUserDataFailed: false,
  logoutRequest: false,
  logoutRespond: null,
  logoutRequestFailed: false,
  userData: null
}

export function profile(state = initialState, action) {
  switch (action.type) {
    case SEND_REG_REQUEST: {
      return {
        ...state,
        profileRequest: true,
        profileFailed: false,
      };
    }
    case REG_REQUEST_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        profileRequest: false
      };
    }
    case REG_REQUEST_FAILED: {
      return {
        ...state,
        profileFailed: true,
        profileRequest: false
      };
    }
    case SET_USER_AUTHORIZATION_STATUS: {
      return {
        ...state,
        isAuthorized: action.payload
      };
    }
    case SEND_USERDATA_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataFailed: false,
      };
    }
    case USERDATA_REQUEST_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        getUserDataRequest: false
      };
    }
    case USERDATA_REQUEST_FAILED: {
      return {
        ...state,
        profileFailed: true,
        getUserDataFailed: false
      };
    }
    case SEND_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
      };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        logoutRespond: action.payload,
        logoutRequest: false,
        logoutRequestFailed: false,
      };
    }
    case LOGOUT_REQUEST_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
      };
    }
    default: {
      return state
    }
  }
}
