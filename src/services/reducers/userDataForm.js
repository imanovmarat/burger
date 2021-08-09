import {
  USER_FORM_SET_VALUE,
  USER_FORM_SUBMIT,
  USER_FORM_SUBMIT_SUCCESS,
  USER_FORM_SUBMIT_FAILED
} from "../actions/userDataForm";

const initialState = {
  form: {
    name: '',
    email: '',
    password: ''
  },
  submitFormRequest: false,
  submitFormFailed: false,
}

export function userFormReducer(state = initialState, action) {
  switch (action.type) {
    case USER_FORM_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    }
    case USER_FORM_SUBMIT: {
      return {
        ...state,
        submitFormRequest: true,
        submitFormFailed: false,
      };
    }
    case USER_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: action.payload,
        submitFormRequest: false
      };
    }
    case USER_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        submitFormFailed: true,
        submitFormRequest: false
      };
    }
    default: {
      return state
    }
  }
}
