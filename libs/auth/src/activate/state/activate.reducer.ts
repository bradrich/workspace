import { HttpErrorResponse } from '@angular/common/http';

import { ActivateActions, ActivateActionTypes } from './activate.actions';

export interface ActivateState {
  pending: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
}

export const activateInitialState: ActivateState = {
  pending: false,
  success: false,
  error: null
};

export function activateReducer(
  state = activateInitialState,
  action: ActivateActions
): ActivateState {
  switch (action.type) {
    case ActivateActionTypes.Activate:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case ActivateActionTypes.ActivateSuccess:
      return {
        ...state,
        pending: false,
        success: true
      };

    case ActivateActionTypes.ActivateFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const activateSelectors = {
  getPending: (state: ActivateState) => state.pending,
  getSuccess: (state: ActivateState) => state.success,
  getError: (state: ActivateState) => state.error
};
