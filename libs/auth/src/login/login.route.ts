import { CustomRoute } from '@swampfox/shared';

import { LoginComponent } from './login.component';

export const loginRoute: CustomRoute = {
  path: 'login',
  component: LoginComponent,
  data: {
    name: 'login',
    title: 'Cole Parmer - Sign In',
    isAuthRoute: true
  }
};
