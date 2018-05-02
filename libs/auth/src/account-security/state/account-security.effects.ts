import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AccountService } from '../../account/account.service';
import { PasswordResetForceService } from '../../password-reset-force/password-reset-force.service';
import {
  AccountSecurityActionTypes,
  AccountSecurityUpdate,
  AccountSecurityUpdateFail,
  AccountSecurityUpdateSuccess
} from './account-security.actions';

@Injectable()
export class AccountSecurityEffects {
  @Effect()
  update$ = this.actions$.pipe(
    ofType(AccountSecurityActionTypes.AccountSecurityUpdate),
    map((action: AccountSecurityUpdate) => action.payload),
    exhaustMap((password: string) =>
      this.accountService.changePassword(password).pipe(
        map(() => {
          return new AccountSecurityUpdateSuccess(password);
        }),
        catchError((err: HttpErrorResponse) => of(new AccountSecurityUpdateFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType(AccountSecurityActionTypes.AccountSecurityUpdateSuccess),
    map((action: AccountSecurityUpdateSuccess) => action.payload),
    tap((password: string) => {
      this.alertService.show('Account security update success!', 'success');
      this.passwordResetForceService.checkPassword(password);
    })
  );

  constructor(
    private actions$: Actions,
    private passwordResetForceService: PasswordResetForceService,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
}
