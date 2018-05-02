import { inject, TestBed } from '@angular/core/testing';

import { PasswordResetForceService } from './password-reset-force.service';

describe('PasswordResetForceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetForceService]
    });
  });

  it(
    'should be created',
    inject([PasswordResetForceService], (service: PasswordResetForceService) => {
      expect(service).toBeTruthy();
    })
  );
});
