import { headerInitialState, headerReducer } from './header.reducer';

describe('Header Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = headerReducer(headerInitialState, action);

      expect(result).toBe(headerInitialState);
    });
  });
});
