import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { HealthEffects } from './health.effects';

describe('HealthService', () => {
  let actions$: Observable<any>;
  let effects: HealthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(HealthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
