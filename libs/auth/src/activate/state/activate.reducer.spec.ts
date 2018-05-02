import { activateInitialState, activateReducer } from './activate.reducer';

describe('Activate Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = activateReducer(activateInitialState, action);

      expect(result).toBe(activateInitialState);
    });
  });
});
