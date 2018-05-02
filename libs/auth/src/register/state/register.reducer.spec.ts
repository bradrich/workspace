import { registerInitialState, registerReducer } from './register.reducer';

describe('Register Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = registerReducer(registerInitialState, action);

      expect(result).toBe(registerInitialState);
    });
  });
});
