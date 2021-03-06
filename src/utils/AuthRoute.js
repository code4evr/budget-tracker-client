import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Redirect to="/app/home" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
