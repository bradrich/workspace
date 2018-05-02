import { inject, TestBed } from '@angular/core/testing';

import { HasAuthorityGuard } from './has-authority.guard';

describe('HasAuthorityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasAuthorityGuard]
    });
  });

  it(
    'should ...',
    inject([HasAuthorityGuard], (guard: HasAuthorityGuard) => {
      expect(guard).toBeTruthy();
    })
  );
});
