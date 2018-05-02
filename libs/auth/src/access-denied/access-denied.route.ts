import { CustomRoute } from '@swampfox/shared';

import { HasAuthorityGuard } from '../has-authority/has-authority.guard';
import { AccessDeniedComponent } from './access-denied.component';

/**
 * Access Denied route. The usage of this route is in the `app-routing.module.ts`.
 */
export const accessDeniedRoute: CustomRoute = {
  path: 'access-denied',
  component: AccessDeniedComponent,
  canActivate: [HasAuthorityGuard],
  data: {
    name: 'accessDenied',
    title: 'Access Denied',
    isAuthRoute: false
  }
};
