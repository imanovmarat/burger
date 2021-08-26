import {
  USER_FORM_SET_VALUE,
  USER_FORM_SUBMIT,
  USER_FORM_SUBMIT_SUCCESS,
  USER_FORM_SUBMIT_FAILED
} from "../actions/userDataForm";
import { userFormReducer } from './userDataForm';

const initialState = {
  form: {
    name: '',
    email: '',
    password: ''
  },
  submitFormRequest: false,
  submitFormFailed: false,
}

describe('userFormReducer', () => {
  it('should return the initial state', () => {
    expect(userFormReducer(undefined, {})).toEqual(initialState)
  })

  it('should return form values', () => {
    expect(userFormReducer(initialState, {
      type: USER_FORM_SET_VALUE,
      field: 'field_name',
      value: 'field_value'
    })).toEqual({
                  ...initialState,
                  form: {
                    ...initialState.form,
                    'field_name': 'field_value'
                  }
                })
  })

  it('should return submitFormRequest status', () => {
    expect(userFormReducer(initialState, { type: USER_FORM_SUBMIT })).toEqual({
                                                                                ...initialState,
                                                                                submitFormRequest: true,
                                                                                submitFormFailed: false,
                                                                              })
  })

  it('should return USER_FORM_SUBMIT_SUCCESS ', () => {
    expect(userFormReducer(initialState, { type: USER_FORM_SUBMIT_SUCCESS, payload: 'something' })).toEqual({
                                                                                                              ...initialState,
                                                                                                              form: 'something',
                                                                                                              submitFormRequest: false
                                                                                                            })
  })

  it('should return USER_FORM_SUBMIT_FAILED ', () => {
    expect(userFormReducer(initialState, { type: USER_FORM_SUBMIT_FAILED })).toEqual({
                                                                                       ...initialState,
                                                                                       submitFormFailed: true,
                                                                                       submitFormRequest: false
                                                                                     })
  })
})
