import { HttpErrorResponse } from '@angular/common/http';
import { AuthRole } from '@swampfox/auth';
import * as _ from 'lodash';

import { User } from '../user.model';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
  users: User[] | null;
  totalCount: number | null;
  user: User | null;
  selectedUsers: User[] | null;
  authorities: AuthRole[] | null;
  pending: boolean;
  refreshing: boolean;
  success: boolean;
  error: HttpErrorResponse | null;
  deletePending: boolean;
  deleteSuccess: boolean;
}

export const userInitialState: UserState = {
  users: null,
  totalCount: 0,
  user: null,
  selectedUsers: null,
  authorities: null,
  pending: false,
  refreshing: false,
  success: false,
  error: null,
  deletePending: false,
  deleteSuccess: false
};

export function userReducer(state = userInitialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.UserGetAll:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case UserActionTypes.UserGetAllSuccess:
      return {
        ...state,
        users: _.cloneDeep(action.users),
        totalCount: action.totalCount,
        pending: false,
        refreshing: false,
        success: true,
        error: null
      };

    case UserActionTypes.UserGetAllFail:
      return {
        ...state,
        pending: false,
        refreshing: false,
        success: false,
        error: action.payload
      };

    case UserActionTypes.UserGet:
      return {
        ...state,
        pending: true,
        success: false,
        error: null
      };

    case UserActionTypes.UserGetSuccess:
      return {
        ...state,
        pending: false,
        user: _.cloneDeep(action.payload),
        success: true
      };

    case UserActionTypes.UserGetFail:
      return {
        ...state,
        pending: false,
        success: false,
        error: action.payload
      };

    case UserActionTypes.UserUpdateSuccess:
      return {
        ...state,
        users: state.users.map(
          (user: User) => (user.id === action.payload.id ? { ...user, ...action.payload } : user)
        ),
        user: action.payload,
        success: true
      };

    case UserActionTypes.UserGetAuthoritiesSuccess:
      return {
        ...state,
        authorities: _.cloneDeep(action.payload)
      };

    case UserActionTypes.UserDelete:
      return {
        ...state,
        deletePending: true,
        deleteSuccess: false
      };

    case UserActionTypes.UserDeleteSuccess:
      return {
        ...state,
        users: state.users.filter((user: User) => user.id !== action.payload.id),
        deletePending: false,
        deleteSuccess: true
      };

    case UserActionTypes.UserSelect:
      return {
        ...state,
        selectedUsers: action.payload
      };

    case UserActionTypes.UserRefreshDataTable:
      return {
        ...state,
        refreshing: true
      };

    default:
      return state;
  }
}

export const userSelectors = {
  getUsers: (state: UserState) => state.users,
  getTotalCount: (state: UserState) => state.totalCount,
  getUser: (state: UserState) => state.user,
  getSelectedUsers: (state: UserState) => state.selectedUsers,
  getAuthorities: (state: UserState) => state.authorities,
  getPending: (state: UserState) => state.pending,
  getRefreshing: (state: UserState) => state.refreshing,
  getSuccess: (state: UserState) => state.success,
  getError: (state: UserState) => state.error,
  getDeletePending: (state: UserState) => state.deletePending,
  getDeleteSuccess: (state: UserState) => state.deleteSuccess
};
