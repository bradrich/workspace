import { authRoleAdmin, authRoleUser, HasAuthorityGuard } from '@swampfox/auth';
import { CustomRoute } from '@swampfox/shared';

import { UserComponent } from './user.component';

export const userRoute: CustomRoute = {
  path: 'users',
  component: UserComponent,
  canActivate: [HasAuthorityGuard],
  data: {
    name: 'userManagement',
    title: 'User Management',
    authorities: [authRoleAdmin, authRoleUser],
    isAuthRoute: false
  }
};
