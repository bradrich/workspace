import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { PasswordResetFinishService } from '../password-reset-finish.service';
import {
  PasswordResetFinish,
  PasswordResetFinishActionTypes,
  PasswordResetFinishFail,
  PasswordResetFinishSuccess
} from './password-reset-finish.actions';

@Injectable()
export class PasswordResetFinishEffects {
  @Effect()
  reset$ = this.actions$.pipe(
    ofType(PasswordResetFinishActionTypes.PasswordResetFinish),
    map((action: PasswordResetFinish) => action.payload),
    exhaustMap((keyAndPassword: any) =>
      this.passwordResetFinishService
        .save(keyAndPassword)
        .pipe(
          map(() => new PasswordResetFinishSuccess()),
          catchError((err: HttpErrorResponse) => of(new PasswordResetFinishFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  resetSuccess$ = this.actions$.pipe(
    ofType(PasswordResetFinishActionTypes.PasswordResetFinishSuccess),
    tap(() => {
      this.alertService.show('Password reset success!', 'success');
    })
  );

  constructor(
    private actions$: Actions,
    private passwordResetFinishService: PasswordResetFinishService,
    private alertService: AlertService
  ) {}
}
