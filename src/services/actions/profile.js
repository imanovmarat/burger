import { loginRequest, registerRequest } from "../../utils/api";
import { setCookie } from "../../utils/helpers";

export const SEND_REQUEST = 'SEND_REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';


export function register({ email, password, name }) {
  return function (dispatch) {
    dispatch({ type: SEND_REQUEST });
    registerRequest({ email, password, name })
      .then(res => {
        if (res && res.success) {
          dispatch({
                     type: REQUEST_SUCCESS,
                     payload: res.user
                   });
          const { accessToken, refreshToken } = res;
          setCookie('token', accessToken);
          localStorage.setItem('token', refreshToken);
        } else {
          dispatch({
                     type: REQUEST_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: REQUEST_FAILED
                        });
             }
      )
  }
}

export function login({ email, password }) {
  return async function (dispatch) {
    dispatch({ type: SEND_REQUEST });
    await loginRequest({ email, password })
      .then(res => {
        if (res && res.success) {
          dispatch({
                     type: REQUEST_SUCCESS,
                     payload: res.user
                   });
          const { accessToken, refreshToken } = res;
          setCookie('token', accessToken);
          localStorage.setItem('token', refreshToken);
        } else {
          dispatch({
                     type: REQUEST_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: REQUEST_FAILED
                        });
             }
      )
  }
}

