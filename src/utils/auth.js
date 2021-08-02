import { useContext, useState, createContext } from 'react';
import { deleteCookie, getCookie, setCookie } from "./helpers";
import { getUserRequest, loginRequest, logoutRequest } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { login, REQUEST_FAILED, REQUEST_SUCCESS, SEND_REQUEST } from "../services/actions/profile";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


//------------


export function useProvideAuth() {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ profile }) => profile);

  const getUser = () => {
    return getUserRequest()
      .then(res => dispatch({ type: REQUEST_SUCCESS, payload: res.user }))
  };

  const signIn = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  const signOut = async () => {
    await logoutRequest().finally(_ => {
      deleteCookie('token');
      window.localStorage.removeItem('token')
      dispatch({ type: REQUEST_SUCCESS, payload: '' })
    });

  };

  return {
    userData,
    getUser,
    signIn,
    signOut
  };
}


//-------------






