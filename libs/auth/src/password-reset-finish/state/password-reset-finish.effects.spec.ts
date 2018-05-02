import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { PasswordResetFinishEffects } from './password-reset-finish.effects';

describe('PasswordResetFinishService', () => {
  let actions$: Observable<any>;
  let effects: PasswordResetFinishEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetFinishEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(PasswordResetFinishEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
