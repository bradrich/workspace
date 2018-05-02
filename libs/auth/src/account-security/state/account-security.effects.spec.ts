import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { AccountSecurityEffects } from './account-security.effects';

describe('SecurityService', () => {
  let actions$: Observable<any>;
  let effects: AccountSecurityEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSecurityEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(AccountSecurityEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
