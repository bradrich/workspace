import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { Account } from '../account.model';
import { AccountService } from '../account.service';
import { AccountActionTypes, AccountGetFail, AccountGetSuccess } from './account.actions';

@Injectable()
export class AccountEffects {
  @Effect()
  get$ = this.actions$.pipe(
    ofType(AccountActionTypes.AccountGet),
    exhaustMap(() =>
      this.accountService
        .get()
        .pipe(
          map((account: Account) => new AccountGetSuccess(account)),
          catchError((err: HttpErrorResponse) => of(new AccountGetFail(err)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
}
