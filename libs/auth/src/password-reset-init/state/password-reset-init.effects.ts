import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { PasswordResetInitService } from '../password-reset-init.service';
import {
  PasswordResetInit,
  PasswordResetInitActionTypes,
  PasswordResetInitFail,
  PasswordResetInitSuccess
} from './password-reset-init.actions';

@Injectable()
export class PasswordResetInitEffects {
  @Effect()
  reset$ = this.actions$.pipe(
    ofType(PasswordResetInitActionTypes.PasswordResetInit),
    map((action: PasswordResetInit) => action.payload),
    exhaustMap((email: string) =>
      this.passwordResetInitService
        .save(email)
        .pipe(
          map(() => new PasswordResetInitSuccess()),
          catchError((err: HttpErrorResponse) => of(new PasswordResetInitFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  resetSuccess$ = this.actions$.pipe(
    ofType(PasswordResetInitActionTypes.PasswordResetInitSuccess),
    tap(() => {
      this.alertService.show('Password reset request success!', 'success');
    })
  );

  constructor(
    private actions$: Actions,
    private passwordResetInitService: PasswordResetInitService,
    private alertService: AlertService
  ) {}
}
