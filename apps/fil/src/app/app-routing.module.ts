import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { accessDeniedRoute } from '@swampfox/auth';
import {
  CustomRoutes,
  pageNotFoundRoute,
  RouterPreloadingService,
  serverErrorRoute
} from '@swampfox/shared';

const routes: CustomRoutes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  accessDeniedRoute,
  pageNotFoundRoute,
  serverErrorRoute
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // enableTracing: true, // Debugging purposes only
      preloadingStrategy: RouterPreloadingService
    })
  ]
})
export class AppRoutingModule {}
