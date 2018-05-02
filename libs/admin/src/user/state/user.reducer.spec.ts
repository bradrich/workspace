import { userInitialState, userReducer } from './user.reducer';

describe('User Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = userReducer(userInitialState, action);

      expect(result).toBe(userInitialState);
    });
  });
});
