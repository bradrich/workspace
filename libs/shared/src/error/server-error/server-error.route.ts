import { CustomRoute } from '../../router/router.model';
import { ServerErrorComponent } from './server-error.component';

/**
 * `/server-error` route. The usage of this route is in the `../../../app-routing.module.ts`.
 * @export
 */
export const serverErrorRoute: CustomRoute = {
  path: 'server-error',
  component: ServerErrorComponent,
  data: {
    name: 'serverError',
    title: 'Server Error',
    isAuthRoute: false
  }
};
