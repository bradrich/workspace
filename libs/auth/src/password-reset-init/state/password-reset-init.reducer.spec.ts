import {
  passwordResetInitInitialState,
  passwordResetInitReducer
} from './password-reset-init.reducer';

describe('PasswordResetInit Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = passwordResetInitReducer(passwordResetInitInitialState, action);

      expect(result).toBe(passwordResetInitInitialState);
    });
  });
});
