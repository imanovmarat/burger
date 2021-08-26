import {
  REG_REQUEST_FAILED,
  REG_REQUEST_SUCCESS,
  SEND_REG_REQUEST,
  SET_USER_AUTHORIZATION_STATUS,
  SEND_USERDATA_REQUEST,
  USERDATA_REQUEST_SUCCESS,
  USERDATA_REQUEST_FAILED, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILED, SEND_LOGOUT_REQUEST
} from "../actions/profile";

import { profile } from './profile';

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


describe('profile', () => {
  it('should return the initial state', () => {
    expect(profile(undefined, {})).toEqual(initialState)
  })

  it('should return form values', () => {
    expect(profile(initialState, {
      type: SEND_REG_REQUEST
    })).toEqual({
                  ...initialState,
                  profileRequest: true,
                  profileFailed: false,
                })
  })
  //
  it('should return REG_REQUEST_SUCCESS', () => {
    expect(profile(initialState, { type: REG_REQUEST_SUCCESS, payload: 'something' })).toEqual({
                                                                                                 ...initialState,
                                                                                                 userData: 'something',
                                                                                                 profileRequest: false
                                                                                               })
  })

  it('should return REG_REQUEST_FAILED ', () => {
    expect(profile(initialState, { type: REG_REQUEST_FAILED })).toEqual({
                                                                          ...initialState,
                                                                          profileFailed: true,
                                                                          profileRequest: false
                                                                        })
  })


  it('should return SET_USER_AUTHORIZATION_STATUS ', () => {
    expect(profile(initialState, { type: SET_USER_AUTHORIZATION_STATUS, payload: true })).toEqual({
                                                                                                    ...initialState,
                                                                                                    isAuthorized: true
                                                                                                  })
  })

  it('should return SEND_USERDATA_REQUEST ', () => {
    expect(profile(initialState, { type: SEND_USERDATA_REQUEST })).toEqual({
                                                                             ...initialState,
                                                                             getUserDataRequest: true,
                                                                             getUserDataFailed: false
                                                                           })
  })

  it('should return USERDATA_REQUEST_SUCCESS', () => {
    expect(profile(initialState, { type: USERDATA_REQUEST_SUCCESS, payload: 'something' })).toEqual({
                                                                                                      ...initialState,
                                                                                                      userData: 'something',
                                                                                                      profileRequest: false
                                                                                                    })
  })

  it('should return USERDATA_REQUEST_FAILED ', () => {
    expect(profile(initialState, { type: USERDATA_REQUEST_FAILED })).toEqual({
                                                                               ...initialState,
                                                                               profileFailed: true,
                                                                               getUserDataFailed: false
                                                                             })
  })

  it('should return SEND_LOGOUT_REQUEST ', () => {
    expect(profile(initialState, { type: SEND_LOGOUT_REQUEST })).toEqual({
                                                                           ...initialState,
                                                                           logoutRequest: true,
                                                                           logoutRequestFailed: false,
                                                                         })
  })

  it('should return LOGOUT_REQUEST_SUCCESS ', () => {
    expect(profile(initialState, { type: LOGOUT_REQUEST_SUCCESS, payload: 'something' })).toEqual({
                                                                                                    ...initialState,
                                                                                                    logoutRespond: 'something',
                                                                                                    logoutRequest: false,
                                                                                                    logoutRequestFailed: false,
                                                                                                  })
  })
  it('should return LOGOUT_REQUEST_FAILED ', () => {
    expect(profile(initialState, { type: LOGOUT_REQUEST_FAILED })).toEqual({
                                                                             ...initialState,
                                                                             logoutRequest: false,
                                                                             logoutRequestFailed: true,
                                                                           })
  })

})
