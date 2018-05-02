import { Action } from '@ngrx/store';

export enum PasswordResetForceActionTypes {
  PasswordResetForce = '[PasswordResetForce] Force',
  PasswordResetForceSuccess = '[PasswordResetForce] Force Success'
}

export class PasswordResetForce implements Action {
  readonly type = PasswordResetForceActionTypes.PasswordResetForce;
}

export class PasswordResetForceSuccess implements Action {
  readonly type = PasswordResetForceActionTypes.PasswordResetForceSuccess;
}

export type PasswordResetForceActions = PasswordResetForce | PasswordResetForceSuccess;
