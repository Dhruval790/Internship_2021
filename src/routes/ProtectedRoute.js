/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/user';

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const [user] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => (user ? (<RouteComponent {...routeProps} />) : (<Redirect to="/" />))}
    />
  );
};

export default ProtectedRoute;
