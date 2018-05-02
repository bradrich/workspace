import {
  passwordResetFinishInitialState,
  passwordResetFinishReducer
} from './password-reset-finish.reducer';

describe('PasswordResetFinish Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = passwordResetFinishReducer(passwordResetFinishInitialState, action);

      expect(result).toBe(passwordResetFinishInitialState);
    });
  });
});
