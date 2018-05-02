import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { HealthService } from '../health.service';
import { HealthActionTypes, HealthGetAllFail, HealthGetAllSuccess } from './health.actions';

@Injectable()
export class HealthEffects {
  @Effect()
  get$ = this.actions$.pipe(
    ofType(HealthActionTypes.HealthGetAll),
    exhaustMap(() =>
      this.healthService
        .checkHealth()
        .pipe(
          map((data: any) => new HealthGetAllSuccess(this.healthService.transformHealthData(data))),
          catchError((err: HttpErrorResponse) => of(new HealthGetAllFail(err)))
        )
    )
  );

  constructor(private actions$: Actions, private healthService: HealthService) {}
}
