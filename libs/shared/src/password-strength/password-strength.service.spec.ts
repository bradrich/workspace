import { inject, TestBed } from '@angular/core/testing';

import { PasswordStrengthService } from './password-strength.service';

describe('PasswordStrengthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordStrengthService]
    });
  });

  it(
    'should be created',
    inject([PasswordStrengthService], (service: PasswordStrengthService) => {
      expect(service).toBeTruthy();
    })
  );
});
