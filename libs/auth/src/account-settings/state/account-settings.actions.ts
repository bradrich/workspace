import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Account } from '../../account/account.model';

export enum AccountSettingsActionTypes {
  AccountSettingsUpdate = '[Account Settings] Update',
  AccountSettingsUpdateSuccess = '[Account Settings] Update Success',
  AccountSettingsUpdateFail = '[Account Settings] Update Fail'
}

export class AccountSettingsUpdate implements Action {
  readonly type = AccountSettingsActionTypes.AccountSettingsUpdate;
  constructor(public payload: Account) {}
}

export class AccountSettingsUpdateSuccess implements Action {
  readonly type = AccountSettingsActionTypes.AccountSettingsUpdateSuccess;
  constructor(public payload: Account) {}
}

export class AccountSettingsUpdateFail implements Action {
  readonly type = AccountSettingsActionTypes.AccountSettingsUpdateFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type AccountSettingsActions =
  | AccountSettingsUpdate
  | AccountSettingsUpdateSuccess
  | AccountSettingsUpdateFail;
