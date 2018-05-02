import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { AccountSettingsEffects } from './account-settings.effects';

describe('AccountSettingsService', () => {
  let actions$: Observable<any>;
  let effects: AccountSettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSettingsEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(AccountSettingsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
