import { CustomRoute } from '@swampfox/shared';

import { PasswordResetFinishComponent } from './password-reset-finish.component';

export const passwordResetFinishRoute: CustomRoute = {
  path: 'password-reset/finish',
  component: PasswordResetFinishComponent,
  data: {
    name: 'passwordResetFinish',
    title: 'Password Reset Finish',
    isAuthRoute: true
  }
};
