import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Account } from '../../account/account.model';
import { LogoutService } from '../../logout/logout.service';
import { PasswordResetForceService } from '../../password-reset-force/password-reset-force.service';
import { LoginCredentials } from '../login-credentials.model';
import { LoginService } from '../login.service';
import { Login, LoginActionTypes, LoginFail, LoginSuccess } from './login.actions';

@Injectable()
export class LoginEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(LoginActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((creds: LoginCredentials) =>
      this.loginService.login(creds).pipe(
        map((account: Account) => {
          this.loginService.saveCredentials(creds);
          this.passwordResetForceService.checkPassword(creds.password);
          return new LoginSuccess(account);
        }),
        catchError((err: HttpErrorResponse) => of(new LoginFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSuccess),
    tap((authed) => {
      this.loginService.loginSuccess();
    })
  );

  @Effect({ dispatch: false })
  loginFail$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginFail),
    map((action: LoginFail) => action.payload),
    tap((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.alertService.show(
          'The username or password you provided is incorrect. Please try again.',
          'danger'
        );
      }
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginRedirect),
    tap((authed) => {
      this.logoutService.logout();
    })
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private logoutService: LogoutService,
    private passwordResetForceService: PasswordResetForceService,
    private alertService: AlertService
  ) {}
}
