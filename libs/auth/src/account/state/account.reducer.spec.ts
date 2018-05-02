import { accountInitialState, accountReducer } from './account.reducer';

describe('Account Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = accountReducer(accountInitialState, action);

      expect(result).toBe(accountInitialState);
    });
  });
});
