import {
  PasswordResetForceActions,
  PasswordResetForceActionTypes
} from './password-reset-force.actions';

export interface PasswordResetForceState {
  forcing: boolean;
}

export const passwordResetForceInitialState: PasswordResetForceState = {
  forcing: false
};

export function passwordResetForceReducer(
  state = passwordResetForceInitialState,
  action: PasswordResetForceActions
): PasswordResetForceState {
  switch (action.type) {
    case PasswordResetForceActionTypes.PasswordResetForce:
      return {
        ...state,
        forcing: true
      };

    case PasswordResetForceActionTypes.PasswordResetForceSuccess:
      return {
        ...state,
        forcing: false
      };

    default:
      return state;
  }
}

export const passwordResetForceSelectors = {
  getForcing: (state: PasswordResetForceState) => state.forcing
};
