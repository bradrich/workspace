import { HttpErrorResponse } from '@angular/common/http';

import { AccountSecurityActions, AccountSecurityActionTypes } from './account-security.actions';

export interface AccountSecurityState {
  pending: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
}

export const accountSecurityInitialState: AccountSecurityState = {
  pending: false,
  success: false,
  error: null
};

export function accountSecurityReducer(
  state = accountSecurityInitialState,
  action: AccountSecurityActions
): AccountSecurityState {
  switch (action.type) {
    case AccountSecurityActionTypes.AccountSecurityUpdate:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case AccountSecurityActionTypes.AccountSecurityUpdateSuccess:
      return {
        ...state,
        pending: false,
        success: true
      };

    case AccountSecurityActionTypes.AccountSecurityUpdateFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const accountSecuritySelectors = {
  getPending: (state: AccountSecurityState) => state.pending,
  getSuccess: (state: AccountSecurityState) => state.success,
  getError: (state: AccountSecurityState) => state.error
};
