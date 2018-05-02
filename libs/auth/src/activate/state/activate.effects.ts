import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { ActivateService } from '../activate.service';
import { Activate, ActivateActionTypes, ActivateFail, ActivateSuccess } from './activate.actions';

@Injectable()
export class ActivateEffects {
  @Effect()
  activate$ = this.actions$.pipe(
    ofType(ActivateActionTypes.Activate),
    map((action: Activate) => action.payload),
    exhaustMap((key: string) =>
      this.activateService
        .get(key)
        .pipe(
          map(() => new ActivateSuccess()),
          catchError((err: HttpErrorResponse) => of(new ActivateFail(err)))
        )
    )
  );

  constructor(private actions$: Actions, private activateService: ActivateService) {}
}
