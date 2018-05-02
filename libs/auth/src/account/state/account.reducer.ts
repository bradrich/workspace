import { HttpErrorResponse } from '@angular/common/http';

import {
  AccountSettingsActions,
  AccountSettingsActionTypes
} from '../../account-settings/state/account-settings.actions';
import { LoginActions, LoginActionTypes } from '../../login/state/login.actions';
import { LogoutActions, LogoutActionTypes } from '../../logout/state/logout.actions';
import { Account } from '../account.model';
import { AccountActions, AccountActionTypes } from './account.actions';

export interface AccountState {
  loggedIn: boolean;
  account: Account | null;
  pending: boolean;
  error: HttpErrorResponse | null;
}

export const accountInitialState: AccountState = {
  loggedIn: false,
  account: null,
  pending: false,
  error: null
};

export function accountReducer(
  state = accountInitialState,
  action: AccountActions | AccountSettingsActions | LoginActions | LogoutActions
): AccountState {
  switch (action.type) {
    case AccountActionTypes.AccountGet:
      return {
        ...state,
        pending: true
      };

    case AccountActionTypes.AccountGetSuccess:
      return {
        ...state,
        loggedIn: true,
        account: action.payload,
        pending: false
      };

    case AccountActionTypes.AccountGetFail:
      return {
        ...state,
        loggedIn: false,
        pending: false,
        error: action.payload
      };

    case AccountSettingsActionTypes.AccountSettingsUpdateSuccess:
      return {
        ...state,
        account: action.payload
      };

    case LoginActionTypes.LoginSuccess:
      return {
        ...state,
        loggedIn: true,
        account: action.payload
      };

    case LogoutActionTypes.Logout:
      return accountInitialState;

    default:
      return state;
  }
}

export const accountSelectors = {
  getLoggedIn: (state: AccountState) => state.loggedIn,
  getAccount: (state: AccountState) => state.account,
  getPending: (state: AccountState) => state.pending,
  getError: (state: AccountState) => state.error
};
