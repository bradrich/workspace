import { Action } from '@ngrx/store';

import { LayoutStateModel } from '../layout-state.model';

export enum LayoutActionTypes {
  LayoutStateChange = '[Layout] State Change'
}

export class LayoutStateChange implements Action {
  readonly type = LayoutActionTypes.LayoutStateChange;
  constructor(public payload: LayoutStateModel) {}
}

export type LayoutActions = LayoutStateChange;
