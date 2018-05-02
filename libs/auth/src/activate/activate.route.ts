import { CustomRoute } from '@swampfox/shared';

import { ActivateComponent } from './activate.component';

export const activateRoute: CustomRoute = {
  path: 'activate',
  component: ActivateComponent,
  data: {
    name: 'activate',
    title: 'Account Activation',
    isAuthRoute: true
  }
};
