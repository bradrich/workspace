import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export enum ActivateActionTypes {
  Activate = '[Activate] Activate',
  ActivateSuccess = '[Activate] Success',
  ActivateFail = '[Activate] Fail'
}

export class Activate implements Action {
  readonly type = ActivateActionTypes.Activate;
  constructor(public payload: string) {}
}

export class ActivateSuccess implements Action {
  readonly type = ActivateActionTypes.ActivateSuccess;
}

export class ActivateFail implements Action {
  readonly type = ActivateActionTypes.ActivateFail;
  constructor(public payload: HttpErrorResponse) {}
}

export type ActivateActions = Activate | ActivateSuccess | ActivateFail;
