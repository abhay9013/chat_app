import { Col, Grid, Row } from 'rsuite';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Chat from './Chat';
import Sidebar from '../../components/Sidebar';
import { RoomProvider } from '../../context/roomscontext';
import { useMediaQuery } from '../../misc/custom-hooks';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width:992px');
  const { isExact } = useRouteMatch(); //checks if we are on home page

  const canRenderSidebar = isDesktop || isExact;

  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}

          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={26} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">Please Select Chat</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomProvider>
  );
};

export default Home;
