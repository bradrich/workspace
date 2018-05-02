import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum AccountSecurityActionTypes {
  AccountSecurityUpdate = '[Account Security] Update',
  AccountSecurityUpdateSuccess = '[Account Security] Update Success',
  AccountSecurityUpdateFail = '[Account Security] Update Fail'
}

export class AccountSecurityUpdate implements Action {
  readonly type = AccountSecurityActionTypes.AccountSecurityUpdate;
  constructor(public payload: string) {}
}

export class AccountSecurityUpdateSuccess implements Action {
  readonly type = AccountSecurityActionTypes.AccountSecurityUpdateSuccess;
  constructor(public payload: string) {}
}

export class AccountSecurityUpdateFail implements Action {
  readonly type = AccountSecurityActionTypes.AccountSecurityUpdateFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type AccountSecurityActions =
  | AccountSecurityUpdate
  | AccountSecurityUpdateSuccess
  | AccountSecurityUpdateFail;
