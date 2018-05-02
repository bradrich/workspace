import { accountSettingsInitialState, accountSettingsReducer } from './account-settings.reducer';

describe('AccountSettings Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = accountSettingsReducer(accountSettingsInitialState, action);

      expect(result).toBe(accountSettingsInitialState);
    });
  });
});
