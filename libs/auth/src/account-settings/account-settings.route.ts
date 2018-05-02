import { CustomRoute, UnsavedChangesGuard } from '@swampfox/shared';

import { authRoleAdmin, authRoleUser } from '../auth.constants';
import { HasAuthorityGuard } from '../has-authority/has-authority.guard';
import { AccountSettingsComponent } from './account-settings.component';

export const accountSettingsRoute: CustomRoute = {
  path: 'account/settings',
  component: AccountSettingsComponent,
  canActivate: [HasAuthorityGuard],
  canDeactivate: [UnsavedChangesGuard],
  data: {
    name: 'accountSettings',
    title: 'Account settings',
    authorities: [authRoleAdmin, authRoleUser],
    isAuthRoute: false
  }
};
