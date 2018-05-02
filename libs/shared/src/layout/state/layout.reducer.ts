import { LayoutStateModel } from '../layout-state.model';
import { LayoutActions, LayoutActionTypes } from './layout.actions';

export interface LayoutState {
  status: LayoutStateModel;
}

export const layoutInitialState: LayoutState = {
  status: {
    widths: {
      contentWidth: 0,
      editWidth: 0
    }
  }
};

export function layoutReducer(state = layoutInitialState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.LayoutStateChange:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}

export const layoutSelectors = {
  getLayoutStatus: (state: LayoutState) => state.status
};
