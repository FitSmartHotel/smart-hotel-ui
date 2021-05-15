import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import NumberDeleteDialog from 'app/modules/account/number/number-delete.dialog';
import CreateNumber from 'app/modules/account/number/create.number';
import Number from 'app/modules/account/number/number';
import NumberAssignDialog from 'app/modules/account/number/number-assign.dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/new`} component={CreateNumber} />
      <ErrorBoundaryRoute path={`${match.url}`} component={Number} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:number/delete`} component={NumberDeleteDialog} />
    <ErrorBoundaryRoute path={`${match.url}/:number/assign`} component={NumberAssignDialog} />
  </>
);

export default Routes;
