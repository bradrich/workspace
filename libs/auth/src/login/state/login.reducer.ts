import { HttpErrorResponse } from '@angular/common/http';

import { LoginActions, LoginActionTypes } from './login.actions';

export interface LoginState {
  pending: boolean;
  error: HttpErrorResponse | null;
}

export const loginInitialState: LoginState = {
  pending: false,
  error: null
};

export function loginReducer(state = loginInitialState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.Login:
      return {
        ...state,
        pending: true,
        error: null
      };

    case LoginActionTypes.LoginSuccess:
      return {
        ...state,
        pending: false
      };

    case LoginActionTypes.LoginFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const loginSelectors = {
  getPending: (state: LoginState) => state.pending,
  getError: (state: LoginState) => state.error
};
