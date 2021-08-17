import { Redirect, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

export function ProtectedResetPasswordRoute({ children, ...rest }) {
  const { isAuthorized } = useSelector(({ profile }) => profile);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log('render', location)
        return (!isAuthorized && (location.state?.from === "/forgot-password"))
          ? (children)
          : (<Redirect to='/login'/>)
      }}
    />
  );
}
