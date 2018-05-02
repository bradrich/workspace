import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { AuthRole } from '@swampfox/auth';
import { ApiParams } from '@swampfox/shared';

import { User } from '../user.model';

export enum UserActionTypes {
  UserCreate = '[User] Create',
  UserCreateSuccess = '[User] Create Success',
  UserCreateFail = '[User] Create Fail',
  UserGetAll = '[User] Get All',
  UserGetAllSuccess = '[User] Get All Success',
  UserGetAllFail = '[User] Get All Fail',
  UserGet = '[User] Get',
  UserGetSuccess = '[User] Get Success',
  UserGetFail = '[User] Get Fail',
  UserGetAuthorities = '[User] Get Authorities',
  UserGetAuthoritiesSuccess = '[User] Get Authorities Success',
  UserGetAuthoritiesFail = '[User] Get Authorities Fail',
  UserUpdate = '[User] Update',
  UserUpdateSuccess = '[User] Update Success',
  UserUpdateFail = '[User] Update Fail',
  UserPasswordReset = '[User] Password Reset',
  UserPasswordResetSuccess = '[User] Password Reset Success',
  UserPasswordResetFail = '[User] Password Reset Fail',
  UserDelete = '[User] Delete',
  UserDeleteSuccess = '[User] Delete Success',
  UserDeleteFail = '[User] Delete Fail',
  UserSelect = '[User] Select',
  UserResetPassword = '[User] Reset Password',
  UserResetPasswordSuccess = '[User] Reset Password Success',
  UserResetPasswordFail = '[User] Reset Password Fail',
  UserRefreshDataTable = '[User] Refresh Data Table'
}

export class UserCreate implements Action {
  readonly type = UserActionTypes.UserCreate;
  constructor(public payload: User) {}
}

export class UserCreateSuccess implements Action {
  readonly type = UserActionTypes.UserCreateSuccess;
}

export class UserCreateFail implements Action {
  readonly type = UserActionTypes.UserCreateFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserGetAll implements Action {
  readonly type = UserActionTypes.UserGetAll;
  constructor(public payload: ApiParams) {}
}

export class UserGetAllSuccess implements Action {
  readonly type = UserActionTypes.UserGetAllSuccess;
  constructor(public users: User[], public totalCount: number) {}
}

export class UserGetAllFail implements Action {
  readonly type = UserActionTypes.UserGetAllFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserGet implements Action {
  readonly type = UserActionTypes.UserGet;
  constructor(public payload: string) {}
}

export class UserGetSuccess implements Action {
  readonly type = UserActionTypes.UserGetSuccess;
  constructor(public payload: User) {}
}

export class UserGetFail implements Action {
  readonly type = UserActionTypes.UserGetFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserGetAuthorities implements Action {
  readonly type = UserActionTypes.UserGetAuthorities;
}

export class UserGetAuthoritiesSuccess implements Action {
  readonly type = UserActionTypes.UserGetAuthoritiesSuccess;
  constructor(public payload: AuthRole[]) {}
}

export class UserGetAuthoritiesFail implements Action {
  readonly type = UserActionTypes.UserGetAuthoritiesFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserUpdate implements Action {
  readonly type = UserActionTypes.UserUpdate;
  constructor(public payload: User) {}
}

export class UserUpdateSuccess implements Action {
  readonly type = UserActionTypes.UserUpdateSuccess;
  constructor(public payload: User) {}
}

export class UserUpdateFail implements Action {
  readonly type = UserActionTypes.UserUpdateFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserDelete implements Action {
  readonly type = UserActionTypes.UserDelete;
  constructor(public payload: User) {}
}

export class UserDeleteSuccess implements Action {
  readonly type = UserActionTypes.UserDeleteSuccess;
  constructor(public payload: User) {}
}

export class UserDeleteFail implements Action {
  readonly type = UserActionTypes.UserDeleteFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserSelect implements Action {
  readonly type = UserActionTypes.UserSelect;
  constructor(public payload: User[]) {}
}

export class UserResetPassword implements Action {
  readonly type = UserActionTypes.UserResetPassword;
  constructor(public payload: User) {}
}

export class UserResetPasswordSuccess implements Action {
  readonly type = UserActionTypes.UserResetPasswordSuccess;
  constructor(public payload: User) {}
}

export class UserResetPasswordFail implements Action {
  readonly type = UserActionTypes.UserResetPasswordFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UserRefreshDataTable implements Action {
  readonly type = UserActionTypes.UserRefreshDataTable;
}

export type UserActions =
  | UserCreate
  | UserCreateSuccess
  | UserCreateFail
  | UserGetAll
  | UserGetAllSuccess
  | UserGetAllFail
  | UserGet
  | UserGetSuccess
  | UserGetFail
  | UserGetAuthorities
  | UserGetAuthoritiesSuccess
  | UserGetAuthoritiesFail
  | UserUpdate
  | UserUpdateSuccess
  | UserUpdateFail
  | UserDelete
  | UserDeleteSuccess
  | UserDeleteFail
  | UserSelect
  | UserResetPassword
  | UserResetPasswordSuccess
  | UserResetPasswordFail
  | UserRefreshDataTable;
