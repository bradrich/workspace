import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

import { Health } from '../health.model';
import { HealthActions, HealthActionTypes } from './health.actions';

export interface HealthState {
  health: Health[] | null;
  pending: boolean;
  error: HttpErrorResponse | null;
  selectedHealth: Health[] | null;
}

export const healthInitialState: HealthState = {
  health: null,
  pending: false,
  error: null,
  selectedHealth: null
};

export function healthReducer(state = healthInitialState, action: HealthActions): HealthState {
  switch (action.type) {
    case HealthActionTypes.HealthGetAll:
      return {
        ...state,
        health: null,
        pending: true
      };

    case HealthActionTypes.HealthGetAllSuccess:
      return {
        ...state,
        health: _.cloneDeep(action.payload),
        pending: false
      };

    case HealthActionTypes.HealthGetAllFail:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    case HealthActionTypes.HealthSelect:
      return {
        ...state,
        selectedHealth: action.payload
      };

    default:
      return state;
  }
}

export const healthSelectors = {
  getHealth: (state: HealthState) => state.health,
  getPending: (state: HealthState) => state.pending,
  getError: (state: HealthState) => state.error,
  getSelectedHealth: (state: HealthState) => state.selectedHealth
};
