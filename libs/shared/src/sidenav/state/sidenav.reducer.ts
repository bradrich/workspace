import { SidenavStateModel } from '../sidenav-state.model';
import { SidenavActions, SidenavActionTypes } from './sidenav.actions';

export interface SidenavState {
  opened: boolean;
  status: SidenavStateModel;
}

export const initialSidenavState: SidenavState = {
  opened: false,
  status: {
    parentRouteName: null,
    routeName: null,
    forcedHighlight: null
  }
};

export function sidenavReducer(
  state: SidenavState = initialSidenavState,
  action: SidenavActions
): SidenavState {
  switch (action.type) {
    case SidenavActionTypes.SidenavOpen:
      return {
        ...state,
        opened: true
      };

    case SidenavActionTypes.SidenavClose:
      return {
        ...state,
        opened: false
      };

    case SidenavActionTypes.SidenavStateChange:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}

export const sidenavSelectors = {
  getSidenavOpened: (state: SidenavState) => state.opened,
  getSidenavStatus: (state: SidenavState) => state.status
};
