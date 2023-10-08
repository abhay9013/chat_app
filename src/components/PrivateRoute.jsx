import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profilecontext';

import { Container, Loader } from 'rsuite';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { isLoading, profile } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical speed="slow" size="md" content="Loading" />
      </Container>
    );
  }

  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
