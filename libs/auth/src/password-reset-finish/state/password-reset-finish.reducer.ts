import { HttpErrorResponse } from '@angular/common/http';

import {
  PasswordResetFinishActions,
  PasswordResetFinishActionTypes
} from './password-reset-finish.actions';

export interface PasswordResetFinishState {
  pending: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
}

export const passwordResetFinishInitialState: PasswordResetFinishState = {
  pending: false,
  success: false,
  error: null
};

export function passwordResetFinishReducer(
  state = passwordResetFinishInitialState,
  action: PasswordResetFinishActions
): PasswordResetFinishState {
  switch (action.type) {
    case PasswordResetFinishActionTypes.PasswordResetFinish:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case PasswordResetFinishActionTypes.PasswordResetFinishSuccess:
      return {
        ...state,
        pending: false,
        success: true
      };

    case PasswordResetFinishActionTypes.PasswordResetFinishFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const passwordResetFinishSelectors = {
  getPending: (state: PasswordResetFinishState) => state.pending,
  getSuccess: (state: PasswordResetFinishState) => state.success,
  getError: (state: PasswordResetFinishState) => state.error
};
