import { Action } from '@ngrx/store';

import { SidenavStateModel } from '../sidenav-state.model';

export enum SidenavActionTypes {
  SidenavOpen = '[Sidenav] Open',
  SidenavClose = '[Sidenav] Close',
  SidenavStateChange = '[Sidenav] State Change'
}

export class SidenavOpen implements Action {
  readonly type = SidenavActionTypes.SidenavOpen;
}

export class SidenavClose implements Action {
  readonly type = SidenavActionTypes.SidenavClose;
}

export class SidenavStateChange implements Action {
  readonly type = SidenavActionTypes.SidenavStateChange;
  constructor(public payload: SidenavStateModel) {}
}

export type SidenavActions = SidenavOpen | SidenavClose | SidenavStateChange;
