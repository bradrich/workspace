import { inject, TestBed } from '@angular/core/testing';

import { PasswordResetInitService } from './password-reset-init.service';

describe('PasswordResetInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetInitService]
    });
  });

  it(
    'should be created',
    inject([PasswordResetInitService], (service: PasswordResetInitService) => {
      expect(service).toBeTruthy();
    })
  );
});
