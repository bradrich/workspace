import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum PasswordResetInitActionTypes {
  PasswordResetInit = '[PasswordResetInit] Init',
  PasswordResetInitSuccess = '[PasswordResetInit] Success',
  PasswordResetInitFail = '[PasswordResetInit] Fail'
}

export class PasswordResetInit implements Action {
  readonly type = PasswordResetInitActionTypes.PasswordResetInit;
  constructor(public payload: string) {}
}

export class PasswordResetInitSuccess implements Action {
  readonly type = PasswordResetInitActionTypes.PasswordResetInitSuccess;
}

export class PasswordResetInitFail implements Action {
  readonly type = PasswordResetInitActionTypes.PasswordResetInitFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type PasswordResetInitActions =
  | PasswordResetInit
  | PasswordResetInitSuccess
  | PasswordResetInitFail;
