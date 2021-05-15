import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import NumberController from 'app/modules/account/controller/number.controller';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}`} component={NumberController} />
    </Switch>
  </>
);

export default Routes;
