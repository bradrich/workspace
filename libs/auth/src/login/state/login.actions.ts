import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Account } from '../../account/account.model';
import { LoginCredentials } from '../login-credentials.model';

export enum LoginActionTypes {
  Login = '[Login] Login',
  LoginSuccess = '[Login] Success',
  LoginFail = '[Login] Fail',
  LoginRedirect = '[Login] Redirect'
}

export class Login implements Action {
  readonly type = LoginActionTypes.Login;
  constructor(public payload: LoginCredentials) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LoginSuccess;
  constructor(public payload: Account) {}
}

export class LoginFail implements Action {
  readonly type = LoginActionTypes.LoginFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoginRedirect implements Action {
  readonly type = LoginActionTypes.LoginRedirect;
}

export type LoginActions = Login | LoginSuccess | LoginFail | LoginRedirect;
