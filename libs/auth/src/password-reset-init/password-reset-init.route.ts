import { CustomRoute } from '@swampfox/shared';

import { PasswordResetInitComponent } from './password-reset-init.component';

export const passwordResetInitRoute: CustomRoute = {
  path: 'password-reset/request',
  component: PasswordResetInitComponent,
  data: {
    name: 'passwordResetInit',
    title: 'Password Reset Request',
    isAuthRoute: true
  }
};
