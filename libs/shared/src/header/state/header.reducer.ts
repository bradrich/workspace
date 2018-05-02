import { HeaderStateModel } from '../header-state.model';
import { HeaderActions, HeaderActionTypes } from './header.actions';

export interface HeaderState {
  status: HeaderStateModel;
}

export const headerInitialState: HeaderState = {
  status: {
    parentRouteTitle: null,
    routeTitle: null
  }
};

export function headerReducer(state = headerInitialState, action: HeaderActions): HeaderState {
  switch (action.type) {
    case HeaderActionTypes.HeaderStateChange:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}

export const headerSelectors = {
  getHeaderState: (state: HeaderState) => state.status
};
