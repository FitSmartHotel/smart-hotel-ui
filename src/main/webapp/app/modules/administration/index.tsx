import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from './user-management';
import Loadable from 'react-loadable';

const Number = Loadable({
  loader: () => import('app/modules/account/number'),
  loading: () => <div>loading ...</div>,
});

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
    <ErrorBoundaryRoute path={`${match.url}/numbers`} component={Number} />
  </div>
);

export default Routes;
