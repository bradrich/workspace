import { HttpErrorResponse } from '@angular/common/http';

import {
  PasswordResetInitActions,
  PasswordResetInitActionTypes
} from './password-reset-init.actions';

export interface PasswordResetInitState {
  pending: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
}

export const passwordResetInitInitialState: PasswordResetInitState = {
  pending: false,
  success: false,
  error: null
};

export function passwordResetInitReducer(
  state = passwordResetInitInitialState,
  action: PasswordResetInitActions
): PasswordResetInitState {
  switch (action.type) {
    case PasswordResetInitActionTypes.PasswordResetInit:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case PasswordResetInitActionTypes.PasswordResetInitSuccess:
      return {
        ...state,
        pending: false,
        success: true
      };

    case PasswordResetInitActionTypes.PasswordResetInitFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const passwordResetInitSelectors = {
  getPending: (state: PasswordResetInitState) => state.pending,
  getSuccess: (state: PasswordResetInitState) => state.success,
  getError: (state: PasswordResetInitState) => state.error
};
