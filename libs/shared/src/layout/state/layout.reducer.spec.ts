import { layoutInitialState, layoutReducer } from './layout.reducer';

describe('layout Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = layoutReducer(layoutInitialState, action);

      expect(result).toBe(layoutInitialState);
    });
  });
});
