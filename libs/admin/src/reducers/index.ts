import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '@swampfox/shared';

import { healthReducer, healthSelectors, HealthState } from '../health/state/health.reducer';
import { userReducer, userSelectors, UserState } from '../user/state/user.reducer';

export interface AdminState {
  user: UserState;
  health: HealthState;
}

export interface State extends SharedState {
  admin: AdminState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  user: userReducer,
  health: healthReducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
export const selectUserState = createSelector(selectAdminState, (state: AdminState) => state.user);
export const selectHealthState = createSelector(
  selectAdminState,
  (state: AdminState) => state.health
);

export const adminSelectors = {
  // Health
  getHealthHealth: createSelector(selectHealthState, healthSelectors.getHealth),
  getHealthPending: createSelector(selectHealthState, healthSelectors.getPending),
  getHealthError: createSelector(selectHealthState, healthSelectors.getError),
  getHealthSelectedHealth: createSelector(selectHealthState, healthSelectors.getSelectedHealth),
  // User
  getUserUsers: createSelector(selectUserState, userSelectors.getUsers),
  getUserTotalCount: createSelector(selectUserState, userSelectors.getTotalCount),
  getUserUser: createSelector(selectUserState, userSelectors.getUser),
  getUserSelectedUsers: createSelector(selectUserState, userSelectors.getSelectedUsers),
  getUserAuthorities: createSelector(selectUserState, userSelectors.getAuthorities),
  getUserPending: createSelector(selectUserState, userSelectors.getPending),
  getUserRefreshing: createSelector(selectUserState, userSelectors.getRefreshing),
  getUserSuccess: createSelector(selectUserState, userSelectors.getSuccess),
  getUserError: createSelector(selectUserState, userSelectors.getError),
  getUserDeletePending: createSelector(selectUserState, userSelectors.getDeletePending),
  getUserDeleteSuccess: createSelector(selectUserState, userSelectors.getDeleteSuccess)
};
