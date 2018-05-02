import { Action } from '@ngrx/store';

import { HeaderStateModel } from '../header-state.model';

export enum HeaderActionTypes {
  HeaderStateChange = '[Header] State Change'
}

export class HeaderStateChange implements Action {
  readonly type = HeaderActionTypes.HeaderStateChange;
  constructor(public payload: HeaderStateModel) {}
}

export type HeaderActions = HeaderStateChange;
