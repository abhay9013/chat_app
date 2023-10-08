import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profilecontext';

const PrivateRoute = ({ children, ...routeProps }) => {
  const profile = useProfile();

  if (!profile) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
