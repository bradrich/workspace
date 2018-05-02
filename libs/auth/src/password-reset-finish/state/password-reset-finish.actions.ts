import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum PasswordResetFinishActionTypes {
  PasswordResetFinish = '[PasswordResetFinish] Finish',
  PasswordResetFinishSuccess = '[PasswordResetFinish] Success',
  PasswordResetFinishFail = '[PasswordResetFinish] Fail'
}

export class PasswordResetFinish implements Action {
  readonly type = PasswordResetFinishActionTypes.PasswordResetFinish;
  constructor(public payload: any) {}
}

export class PasswordResetFinishSuccess implements Action {
  readonly type = PasswordResetFinishActionTypes.PasswordResetFinishSuccess;
}

export class PasswordResetFinishFail implements Action {
  readonly type = PasswordResetFinishActionTypes.PasswordResetFinishFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type PasswordResetFinishActions =
  | PasswordResetFinish
  | PasswordResetFinishSuccess
  | PasswordResetFinishFail;
