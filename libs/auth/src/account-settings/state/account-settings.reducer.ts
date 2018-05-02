import { HttpErrorResponse } from '@angular/common/http';

import { AccountSettingsActions, AccountSettingsActionTypes } from './account-settings.actions';

export interface AccountSettingsState {
  pending: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
}

export const accountSettingsInitialState: AccountSettingsState = {
  pending: false,
  success: false,
  error: null
};

export function accountSettingsReducer(
  state = accountSettingsInitialState,
  action: AccountSettingsActions
): AccountSettingsState {
  switch (action.type) {
    case AccountSettingsActionTypes.AccountSettingsUpdate:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case AccountSettingsActionTypes.AccountSettingsUpdateSuccess:
      return {
        ...state,
        pending: false,
        success: true
      };

    case AccountSettingsActionTypes.AccountSettingsUpdateFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const accountSettingsSelectors = {
  getPending: (state: AccountSettingsState) => state.pending,
  getSuccess: (state: AccountSettingsState) => state.success,
  getError: (state: AccountSettingsState) => state.error
};
