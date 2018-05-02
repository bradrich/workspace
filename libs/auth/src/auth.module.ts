import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@swampfox/shared';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountService } from './account/account.service';
import { ActivateComponent } from './activate/activate.component';
import { ActivateService } from './activate/activate.service';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthStoreModule } from './auth-store.module';
import { HasAuthorityDirective } from './has-authority/has-authority.directive';
import { HasAuthorityGuard } from './has-authority/has-authority.guard';
import { LoginDialogComponent } from './login/login-dialog.component';
import { LoginDialogService } from './login/login-dialog.service';
import { LoginFormComponent } from './login/login-form.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { PasswordResetFinishComponent } from './password-reset-finish/password-reset-finish.component';
import { PasswordResetFinishService } from './password-reset-finish/password-reset-finish.service';
import { PasswordResetForceDialogComponent } from './password-reset-force/password-reset-force-dialog.component';
import { PasswordResetForceService } from './password-reset-force/password-reset-force.service';
import { PasswordResetInitComponent } from './password-reset-init/password-reset-init.component';
import { PasswordResetInitService } from './password-reset-init/password-reset-init.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { TokenInterceptor } from './token/token.interceptor';
import { TokenService } from './token/token.service';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AccountSecurityComponent,
    AccountSettingsComponent,
    ActivateComponent,
    HasAuthorityDirective,
    LoginDialogComponent,
    LoginFormComponent,
    LoginComponent,
    PasswordResetFinishComponent,
    PasswordResetForceDialogComponent,
    PasswordResetInitComponent,
    RegisterComponent
  ],
  entryComponents: [LoginDialogComponent, PasswordResetForceDialogComponent],
  imports: [SharedModule, AuthRoutingModule, AuthStoreModule],
  providers: [
    AccountService,
    ActivateService,
    HasAuthorityGuard,
    LoginDialogService,
    LoginService,
    LogoutService,
    PasswordResetFinishService,
    PasswordResetForceService,
    PasswordResetInitService,
    RegisterService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
