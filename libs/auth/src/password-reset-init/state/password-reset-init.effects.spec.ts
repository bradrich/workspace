import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { PasswordResetInitEffects } from './password-reset-init.effects';

describe('PasswordResetInitService', () => {
  let actions$: Observable<any>;
  let effects: PasswordResetInitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetInitEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(PasswordResetInitEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
