import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AccountSecurityEffects } from './account-security/state/account-security.effects';
import { AccountSettingsEffects } from './account-settings/state/account-settings.effects';
import { AccountEffects } from './account/state/account.effects';
import { ActivateEffects } from './activate/state/activate.effects';
import { LoginEffects } from './login/state/login.effects';
import { LogoutEffects } from './logout/state/logout.effects';
import { PasswordResetFinishEffects } from './password-reset-finish/state/password-reset-finish.effects';
import { PasswordResetInitEffects } from './password-reset-init/state/password-reset-init.effects';
import { authReducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([
      AccountEffects,
      AccountSecurityEffects,
      AccountSettingsEffects,
      ActivateEffects,
      LoginEffects,
      LogoutEffects,
      PasswordResetFinishEffects,
      PasswordResetInitEffects
    ])
  ]
})
export class AuthStoreModule {}
