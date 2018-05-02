import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { headerReducer, headerSelectors, HeaderState } from '../header/state/header.reducer';
import { layoutReducer, layoutSelectors, LayoutState } from '../layout/state/layout.reducer';
import { RouterStateInfo } from '../router/router-state-serializer';
import { sidenavReducer, sidenavSelectors, SidenavState } from '../sidenav/state/sidenav.reducer';

export interface SharedState {
  router: fromRouter.RouterReducerState<RouterStateInfo>;
  header: HeaderState;
  layout: LayoutState;
  sidenav: SidenavState;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  router: fromRouter.routerReducer,
  header: headerReducer,
  layout: layoutReducer,
  sidenav: sidenavReducer
};

export function sharedLogger(reducer: ActionReducer<SharedState>): ActionReducer<SharedState> {
  return function(state: SharedState, action: any): SharedState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const sharedMetaReducers: MetaReducer<SharedState>[] = [sharedLogger, storeFreeze];

export const getHeaderState = createFeatureSelector<HeaderState>('header');
export const getLayoutState = createFeatureSelector<LayoutState>('layout');
export const getSidenavState = createFeatureSelector<SidenavState>('sidenav');

export const sharedSelectors = {
  // Header
  getHeaderStatus: createSelector(getHeaderState, headerSelectors.getHeaderState),
  // Layout
  getLayoutStatus: createSelector(getLayoutState, layoutSelectors.getLayoutStatus),
  // Sidenav
  getSidenavOpened: createSelector(getSidenavState, sidenavSelectors.getSidenavOpened),
  getSidenavStatus: createSelector(getSidenavState, sidenavSelectors.getSidenavStatus)
};
