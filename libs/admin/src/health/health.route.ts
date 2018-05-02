import { authRoleAdmin, authRoleUser, HasAuthorityGuard } from '@swampfox/auth';
import { CustomRoute } from '@swampfox/shared';

import { HealthComponent } from './health.component';

export const healthRoute: CustomRoute = {
  path: 'health',
  component: HealthComponent,
  canActivate: [HasAuthorityGuard],
  data: {
    name: 'health',
    title: 'Health Data',
    authorities: [authRoleAdmin, authRoleUser],
    isAuthRoute: false
  }
};
