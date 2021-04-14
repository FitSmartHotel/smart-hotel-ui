import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import NumberDialog from 'app/modules/account/number/number-delete.dialog';
import CreateNumber from 'app/modules/account/number/create.number';
import Number from 'app/modules/account/number/number';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/new`} component={CreateNumber} />
      <ErrorBoundaryRoute path={`${match.url}`} component={Number} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:number/delete`} component={NumberDialog} />
  </>
);

export default Routes;
