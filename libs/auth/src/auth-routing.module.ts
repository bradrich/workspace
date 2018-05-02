import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from '@swampfox/shared';

import { accessDeniedRoute } from './access-denied/access-denied.route';
import { accountSecurityRoute } from './account-security/account-security.route';
import { accountSettingsRoute } from './account-settings/account-settings.route';
import { activateRoute } from './activate/activate.route';
import { loginRoute } from './login/login.route';
import { passwordResetFinishRoute } from './password-reset-finish/password-reset-finish.route';
import { passwordResetInitRoute } from './password-reset-init/password-reset-init.route';

const routes: CustomRoutes = [
  accessDeniedRoute,
  accountSecurityRoute,
  accountSettingsRoute,
  activateRoute,
  loginRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
