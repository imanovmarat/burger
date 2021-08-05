import { Redirect, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { isAuthorized } = useSelector(({ profile }) => profile);


  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
