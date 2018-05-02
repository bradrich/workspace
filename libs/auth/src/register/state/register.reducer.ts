import { HttpErrorResponse } from '@angular/common/http';

import { RegisterActions, RegisterActionTypes } from './register.actions';

export interface RegisterState {
  pending: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
}

export const registerInitialState: RegisterState = {
  pending: false,
  success: false,
  error: null
};

export function registerReducer(
  state = registerInitialState,
  action: RegisterActions
): RegisterState {
  switch (action.type) {
    case RegisterActionTypes.Register:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case RegisterActionTypes.RegisterSuccess:
      return {
        ...state,
        pending: false,
        success: true
      };

    case RegisterActionTypes.RegisterFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const registerSelectors = {
  getPending: (state: RegisterState) => state.pending,
  getSuccess: (state: RegisterState) => state.success,
  getError: (state: RegisterState) => state.error
};
