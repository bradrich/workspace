import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { AccountEffects } from './account.effects';

describe('AccountService', () => {
  let actions$: Observable<any>;
  let effects: AccountEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(AccountEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
