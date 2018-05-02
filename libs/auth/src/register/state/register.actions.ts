import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Account } from '../../account/account.model';

export enum RegisterActionTypes {
  Register = '[Register] Register',
  RegisterSuccess = '[Register] Success',
  RegisterFail = '[Register] Fail'
}

export class Register implements Action {
  readonly type = RegisterActionTypes.Register;
  constructor(public payload: Account) {}
}

export class RegisterSuccess implements Action {
  readonly type = RegisterActionTypes.RegisterSuccess;
}

export class RegisterFail implements Action {
  readonly type = RegisterActionTypes.RegisterFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type RegisterActions = Register | RegisterSuccess | RegisterFail;
