import { CustomRoute } from '@swampfox/shared';

import { RegisterComponent } from './register.component';

export const registerRoute: CustomRoute = {
  path: 'register',
  component: RegisterComponent,
  data: {
    name: 'register',
    title: 'Account registration',
    isAuthRoute: true
  }
};
