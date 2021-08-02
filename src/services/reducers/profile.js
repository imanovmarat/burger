import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILED } from "../actions/profile";

const initialState = {
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
    default: {
      return state
    }
  }
}
