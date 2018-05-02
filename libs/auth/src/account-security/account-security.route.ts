import { CustomRoute } from '@swampfox/shared';

import { authRoleAdmin, authRoleUser } from '../auth.constants';
import { HasAuthorityGuard } from '../has-authority/has-authority.guard';
import { AccountSecurityComponent } from './account-security.component';

export const accountSecurityRoute: CustomRoute = {
  path: 'account/security',
  component: AccountSecurityComponent,
  canActivate: [HasAuthorityGuard],
  data: {
    name: 'accountSecurity',
    title: 'Account Security',
    authorities: [authRoleAdmin, authRoleUser],
    isAuthRoute: false
  }
};
