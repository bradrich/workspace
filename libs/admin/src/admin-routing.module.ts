import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoutes } from '@swampfox/shared';

import { healthRoute } from './health/health.route';
import { userRoute } from './user/user.route';

const routes: CustomRoutes = [
  {
    path: 'admin',
    children: [healthRoute, userRoute]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule {}
