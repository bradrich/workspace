import { loginInitialState, loginReducer } from './login.reducer';

describe('Login Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = loginReducer(loginInitialState, action);

      expect(result).toBe(loginInitialState);
    });
  });
});
