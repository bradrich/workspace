import { Action } from '@ngrx/store';

export enum LogoutActionTypes {
  Logout = '[Logout] Logout'
}

export class Logout implements Action {
  readonly type = LogoutActionTypes.Logout;
}

export type LogoutActions = Logout;
