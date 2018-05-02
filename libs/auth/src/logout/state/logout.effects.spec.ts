import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { LogoutEffects } from './logout.effects';

describe('LogoutService', () => {
  let actions$: Observable<any>;
  let effects: LogoutEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(LogoutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
