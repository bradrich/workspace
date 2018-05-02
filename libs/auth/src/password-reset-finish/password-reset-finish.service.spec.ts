import { inject, TestBed } from '@angular/core/testing';

import { PasswordResetFinishService } from './password-reset-finish.service';

describe('PasswordResetFinishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetFinishService]
    });
  });

  it(
    'should be created',
    inject([PasswordResetFinishService], (service: PasswordResetFinishService) => {
      expect(service).toBeTruthy();
    })
  );
});
