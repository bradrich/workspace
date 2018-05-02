import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Account } from '../../account/account.model';
import { AccountService } from '../../account/account.service';
import {
  AccountSettingsActionTypes,
  AccountSettingsUpdate,
  AccountSettingsUpdateFail,
  AccountSettingsUpdateSuccess
} from './account-settings.actions';

@Injectable()
export class AccountSettingsEffects {
  @Effect()
  update$ = this.actions$.pipe(
    ofType(AccountSettingsActionTypes.AccountSettingsUpdate),
    map((action: AccountSettingsUpdate) => action.payload),
    exhaustMap((account: Account) =>
      this.accountService
        .save(account)
        .pipe(
          map(() => new AccountSettingsUpdateSuccess(account)),
          catchError((err: HttpErrorResponse) => of(new AccountSettingsUpdateFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType(AccountSettingsActionTypes.AccountSettingsUpdateSuccess),
    tap(() => {
      this.alertService.show('Account settings update success!', 'success');
    })
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
}
