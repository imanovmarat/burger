import { Redirect, Route } from 'react-router-dom';
import { refreshTokenRequest } from "../utils/api";
import { useEffect, useState } from "react";
import { setCookie } from "../utils/helpers";

export function ProtectedRoute({ children, ...rest }) {
  
  const [isValidToken, setIsValidToken] = useState(null);
  const hasToken = localStorage.getItem('token');

  useEffect(() => {
    refreshTokenRequest()
      .then(res => {
        if (res.success) {
          setIsValidToken(true)
          const { refreshToken, accessToken } = res;
          localStorage.setItem('token', refreshToken);
          setCookie('token', accessToken);
        } else {
          setIsValidToken(false)
        }
      })
      .catch(err => {
        console.log('err', err);
        setIsValidToken(false)
      });
  }, [refreshTokenRequest, setIsValidToken, setCookie])

  if (isValidToken === null) return null;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (!hasToken || !isValidToken)
          ? (<Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />)
          : children
      }}
    />
  );
}
