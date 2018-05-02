import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@swampfox/shared';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminStoreModule } from './admin-store.module';
import { HealthComponent } from './health/health.component';
import { HealthService } from './health/health.service';
import { UserDeleteDialogComponent } from './user/user-delete-dialog.component';
import { UserEditComponent } from './user/user-edit.component';
import { UserResetPasswordDialogComponent } from './user/user-reset-password-dialog.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    HealthComponent,
    UserDeleteDialogComponent,
    UserEditComponent,
    UserResetPasswordDialogComponent,
    UserComponent
  ],
  entryComponents: [UserDeleteDialogComponent, UserResetPasswordDialogComponent],
  imports: [SharedModule, AdminRoutingModule, AdminStoreModule],
  providers: [HealthService, UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
