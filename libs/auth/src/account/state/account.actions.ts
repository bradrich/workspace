import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Account } from '../account.model';

export enum AccountActionTypes {
  AccountGet = '[Account] Get',
  AccountGetSuccess = '[Account] Get Success',
  AccountGetFail = '[Account] Get Fail'
}

export class AccountGet implements Action {
  readonly type = AccountActionTypes.AccountGet;
}

export class AccountGetSuccess implements Action {
  readonly type = AccountActionTypes.AccountGetSuccess;
  constructor(public payload: Account) {}
}

export class AccountGetFail implements Action {
  readonly type = AccountActionTypes.AccountGetFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type AccountActions = AccountGet | AccountGetSuccess | AccountGetFail;
