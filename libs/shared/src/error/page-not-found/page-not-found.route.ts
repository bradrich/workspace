import { CustomRoute } from '../../router/router.model';
import { PageNotFoundComponent } from './page-not-found.component';

/**
 * `/page-not-found` route. The usage of this route is in the `../../../app-routing.module.ts`.
 * @export
 */
export const pageNotFoundRoute: CustomRoute = {
  path: '**',
  component: PageNotFoundComponent,
  data: {
    name: 'pageNotFound',
    title: '404 Page Not Found',
    isAuthRoute: false
  }
};
