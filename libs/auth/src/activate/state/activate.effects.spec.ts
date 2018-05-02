import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { ActivateEffects } from './activate.effects';

describe('ActivateService', () => {
  let actions$: Observable<any>;
  let effects: ActivateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(ActivateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
