import { accountSecurityInitialState, accountSecurityReducer } from './account-security.reducer';

describe('Account Security Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = accountSecurityReducer(accountSecurityInitialState, action);

      expect(result).toBe(accountSecurityInitialState);
    });
  });
});
