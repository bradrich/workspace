import { AdminStoreModule } from './admin-store.module';

describe('AdminStoreModule', () => {
  let authStoreModule: AdminStoreModule;

  beforeEach(() => {
    authStoreModule = new AdminStoreModule();
  });

  it('should create an instance', () => {
    expect(authStoreModule).toBeTruthy();
  });
});
