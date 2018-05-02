import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Health } from '../health.model';

export enum HealthActionTypes {
  HealthGetAll = '[Health] Get All',
  HealthGetAllSuccess = '[Health] Get All Success',
  HealthGetAllFail = '[Health] Get All Fail',
  HealthSelect = '[Health] Select'
}

export class HealthGetAll implements Action {
  readonly type = HealthActionTypes.HealthGetAll;
}

export class HealthGetAllSuccess implements Action {
  readonly type = HealthActionTypes.HealthGetAllSuccess;
  constructor(public payload: Health[]) {}
}

export class HealthGetAllFail implements Action {
  readonly type = HealthActionTypes.HealthGetAllFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class HealthSelect implements Action {
  readonly type = HealthActionTypes.HealthSelect;
  constructor(public payload: Health[]) {}
}

export type HealthActions = HealthGetAll | HealthGetAllSuccess | HealthGetAllFail | HealthSelect;
