import { getUserRequest, loginRequest, logoutRequest, registerRequest } from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/helpers";

export const SEND_REG_REQUEST = 'SEND_REG_REQUEST';
export const REG_REQUEST_SUCCESS = 'REG_REQUEST_SUCCESS';
export const REG_REQUEST_FAILED = 'REG_REQUEST_FAILED';
export const SET_USER_AUTHORIZATION_STATUS = 'SET_USER_AUTHORIZATION_STATUS';

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const SEND_USERDATA_REQUEST = 'SEND_USERDATA_REQUEST';
export const USERDATA_REQUEST_SUCCESS = 'USERDATA_REQUEST_SUCCESS';
export const USERDATA_REQUEST_FAILED = 'USERDATA_REQUEST_FAILED';

export const SEND_LOGOUT_REQUEST = 'SEND_LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

export function register({ email, password, name }) {
  return function (dispatch) {
    dispatch({ type: SEND_REG_REQUEST });
    registerRequest({ email, password, name })
      .then(res => {
        if (res && res.success) {
          dispatch({
                     type: REG_REQUEST_SUCCESS,
                     payload: res.user
                   });
          const { accessToken, refreshToken } = res;
          setCookie('token', accessToken);
          localStorage.setItem('token', refreshToken);
        } else {
          dispatch({
                     type: REG_REQUEST_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: REG_REQUEST_FAILED
                        });
             }
      )
  }
}

export function login({ email, password }) {
  return async function (dispatch) {
    dispatch({ type: SEND_LOGIN_REQUEST });
    await loginRequest({ email, password })
      .then(res => {
        if (res && res.success) {
          console.log('1')
          dispatch({
                     type: LOGIN_REQUEST_SUCCESS,
                     payload: res.user
                   });
          console.log('2')
          dispatch({
                     type: SET_USER_AUTHORIZATION_STATUS,
                     payload: true
                   });
          console.log('3')
          const { accessToken, refreshToken } = res;
          setCookie('token', accessToken);
          localStorage.setItem('token', refreshToken);
        } else {
          dispatch({
                     type: LOGIN_REQUEST_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: LOGIN_REQUEST_FAILED
                        });
             }
      )
  }
}

export function getUser() {
  return async function (dispatch) {
    dispatch({ type: SEND_USERDATA_REQUEST });
    await getUserRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
                     type: USERDATA_REQUEST_SUCCESS,
                     payload: res.user
                   });
          dispatch({
                     type: SET_USER_AUTHORIZATION_STATUS,
                     payload: true
                   })
        } else {
          dispatch({
                     type: USERDATA_REQUEST_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: USERDATA_REQUEST_FAILED
                        });
             }
      )
  }
}

export function logout() {
  return async function (dispatch) {
    dispatch({ type: SEND_LOGOUT_REQUEST });
    await logoutRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
                     type: LOGOUT_REQUEST_SUCCESS,
                     payload: res.user
                   });
        } else {
          dispatch({
                     type: LOGOUT_REQUEST_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: LOGOUT_REQUEST_FAILED
                        });
             }
      )
      .finally(_ => {
        deleteCookie('token');
        window.localStorage.removeItem('token');
        dispatch({
                   type: SET_USER_AUTHORIZATION_STATUS,
                   payload: false
                 });
        dispatch({
                   type: USERDATA_REQUEST_SUCCESS,
                   payload: null
                 });
      })
  }
}
