import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '@swampfox/shared';

import {
  accountSecurityReducer,
  accountSecuritySelectors,
  AccountSecurityState
} from '../account-security/state/account-security.reducer';
import {
  accountSettingsReducer,
  accountSettingsSelectors,
  AccountSettingsState
} from '../account-settings/state/account-settings.reducer';
import { accountReducer, accountSelectors, AccountState } from '../account/state/account.reducer';
import {
  activateReducer,
  activateSelectors,
  ActivateState
} from '../activate/state/activate.reducer';
import { loginReducer, loginSelectors, LoginState } from '../login/state/login.reducer';
import {
  passwordResetFinishReducer,
  passwordResetFinishSelectors,
  PasswordResetFinishState
} from '../password-reset-finish/state/password-reset-finish.reducer';
import {
  passwordResetForceReducer,
  passwordResetForceSelectors,
  PasswordResetForceState
} from '../password-reset-force/state/password-reset-force.reducer';
import {
  passwordResetInitReducer,
  passwordResetInitSelectors,
  PasswordResetInitState
} from '../password-reset-init/state/password-reset-init.reducer';
import {
  registerReducer,
  registerSelectors,
  RegisterState
} from '../register/state/register.reducer';

export interface AuthState {
  account: AccountState;
  accountSecurity: AccountSecurityState;
  accountSettings: AccountSettingsState;
  activate: ActivateState;
  login: LoginState;
  passwordResetFinish: PasswordResetFinishState;
  passwordResetForce: PasswordResetForceState;
  passwordResetInit: PasswordResetInitState;
  register: RegisterState;
}

export interface State extends SharedState {
  auth: AuthState;
}

export const authReducers: ActionReducerMap<AuthState> = {
  account: accountReducer,
  accountSecurity: accountSecurityReducer,
  accountSettings: accountSettingsReducer,
  activate: activateReducer,
  login: loginReducer,
  passwordResetFinish: passwordResetFinishReducer,
  passwordResetForce: passwordResetForceReducer,
  passwordResetInit: passwordResetInitReducer,
  register: registerReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAccountState = createSelector(
  selectAuthState,
  (state: AuthState) => state.account
);
export const selectAccountSecurityState = createSelector(
  selectAuthState,
  (state: AuthState) => state.accountSecurity
);
export const selectAccountSettingsState = createSelector(
  selectAuthState,
  (state: AuthState) => state.accountSettings
);
export const selectActivateState = createSelector(
  selectAuthState,
  (state: AuthState) => state.activate
);
export const selectLoginState = createSelector(selectAuthState, (state: AuthState) => state.login);
export const selectPasswordResetFinishState = createSelector(
  selectAuthState,
  (state: AuthState) => state.passwordResetFinish
);
export const selectPasswordResetForceState = createSelector(
  selectAuthState,
  (state: AuthState) => state.passwordResetForce
);
export const selectPasswordResetInitState = createSelector(
  selectAuthState,
  (state: AuthState) => state.passwordResetInit
);
export const selectRegisterState = createSelector(
  selectAuthState,
  (state: AuthState) => state.register
);

export const authSelectors = {
  // Account
  getAccountLoggedIn: createSelector(selectAccountState, accountSelectors.getLoggedIn),
  getAccount: createSelector(selectAccountState, accountSelectors.getAccount),
  getAccountPending: createSelector(selectAccountState, accountSelectors.getPending),
  getAccountError: createSelector(selectAccountState, accountSelectors.getError),
  // Account security
  getAccountSecurityPending: createSelector(
    selectAccountSecurityState,
    accountSecuritySelectors.getPending
  ),
  getAccountSecuritySuccess: createSelector(
    selectAccountSecurityState,
    accountSecuritySelectors.getSuccess
  ),
  getAccountSecurityError: createSelector(
    selectAccountSecurityState,
    accountSecuritySelectors.getError
  ),
  // Account settings
  getAccountSettingsPending: createSelector(
    selectAccountSettingsState,
    accountSettingsSelectors.getPending
  ),
  getAccountSettingsSuccess: createSelector(
    selectAccountSettingsState,
    accountSettingsSelectors.getSuccess
  ),
  getAccountSettingsError: createSelector(
    selectAccountSettingsState,
    accountSettingsSelectors.getError
  ),
  // Activate
  getActivatePending: createSelector(selectActivateState, activateSelectors.getPending),
  getActivateSuccess: createSelector(selectActivateState, activateSelectors.getSuccess),
  getActivateError: createSelector(selectActivateState, activateSelectors.getError),
  // Login
  getLoginPending: createSelector(selectLoginState, loginSelectors.getPending),
  getLoginError: createSelector(selectLoginState, loginSelectors.getError),
  // Password reset finish
  getPasswordResetFinishPending: createSelector(
    selectPasswordResetFinishState,
    passwordResetFinishSelectors.getPending
  ),
  getPasswordResetFinishSuccess: createSelector(
    selectPasswordResetFinishState,
    passwordResetFinishSelectors.getSuccess
  ),
  getPasswordResetFinishError: createSelector(
    selectPasswordResetFinishState,
    passwordResetFinishSelectors.getError
  ),
  // Password reset force
  getPasswordResetForceForcing: createSelector(
    selectPasswordResetForceState,
    passwordResetForceSelectors.getForcing
  ),
  // Password reset init
  getPasswordResetInitPending: createSelector(
    selectPasswordResetInitState,
    passwordResetInitSelectors.getPending
  ),
  getPasswordResetInitSuccess: createSelector(
    selectPasswordResetInitState,
    passwordResetInitSelectors.getSuccess
  ),
  getPasswordResetInitError: createSelector(
    selectPasswordResetInitState,
    passwordResetInitSelectors.getError
  ),
  // Register
  getRegisterPending: createSelector(selectRegisterState, registerSelectors.getPending),
  getRegisterSuccess: createSelector(selectRegisterState, registerSelectors.getSuccess),
  getRegisterError: createSelector(selectRegisterState, registerSelectors.getError)
};
