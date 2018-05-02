import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsHelper, RouterService } from '@swampfox/shared';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { authRememberMeLocalStorageName, authUsernameLocalStorageName } from '../auth.constants';
import { TokenService } from '../token/token.service';
import { LoginCredentials } from './login-credentials.model';
import { LoginDialogService } from './login-dialog.service';

@Injectable()
export class LoginService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private loginDialogService: LoginDialogService,
    private accountService: AccountService,
    private tokenService: TokenService,
    private routerService: RouterService
  ) {}

  /**
   * Creates the `JWT` and then gets the authenticated account.
   * @param {LoginCredentials} creds
   * @returns {Observable<Account>}
   */
  login(creds: LoginCredentials): Observable<Account> {
    return this.tokenService.createToken(creds).pipe(switchMap(() => this.accountService.get()));
  }

  /**
   * Saves the account's login credentials to `localStorage`.
   * @param {LoginCredentials} credentials
   */
  saveCredentials(credentials: LoginCredentials) {
    this.localStorage.store(authUsernameLocalStorageName, credentials.username);
    this.localStorage.store(authRememberMeLocalStorageName, credentials.rememberMe);
  }

  /**
   * Handles `LoginSuccess`.
   */
  loginSuccess() {
    if (this.loginDialogService.isOpen) {
      this.loginSuccessFromDialog();
    } else {
      this.router.navigate([`/${ConstantsHelper.getConstants().appLandingRoute}`]);
    }
  }

  /**
   * Handles `LoginSuccess` if the login comes from the `LoginDialogComponent`.
   */
  loginSuccessFromDialog() {
    this.loginDialogService.close();

    const previousRouteUrl = this.routerService.getUrl();
    if (previousRouteUrl) {
      this.router.navigate(previousRouteUrl);
    } else {
      this.router.navigate([`/${ConstantsHelper.getConstants().appLandingRoute}`]);
    }
  }
}
