import { REQUEST_FAILED, REQUEST_SUCCESS, SEND_REQUEST, SET_USER_AUTHORIZATION_STATUS } from "../actions/profile";

const initialState = {
  isAuthorized: false,
  profileRequest: false,
  profileFailed: false,
  userData: null
}

export function profile(state = initialState, action) {
  switch (action.type) {
    case SEND_REQUEST: {
      return {
        ...state,
        profileRequest: true,
        profileFailed: false,
      };
    }
    case REQUEST_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        profileRequest: false
      };
    }
    case REQUEST_FAILED: {
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
    default: {
      return state
    }
  }
}
