import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@swampfox/shared';
import { LocalStorageService } from 'ngx-webstorage';

import { authRememberMeLocalStorageName, authUsernameLocalStorageName } from '../auth.constants';
import { LoginDialogService } from '../login/login-dialog.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class LogoutService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private loginDialogService: LoginDialogService,
    private tokenService: TokenService,
    private loadingService: LoadingService
  ) {}

  /**
   * Logs out the authenticated account and send them to the `login` page.
   */
  logout() {
    this.loginDialogService.close();

    this.tokenService.destroyToken().subscribe();

    this.localStorage.clear(authUsernameLocalStorageName);
    this.localStorage.clear(authRememberMeLocalStorageName);

    // If the user is not currently on the `/login` route, start the loading feature and send them
    // to the `/login` page.
    if (!this.router.isActive('/login', true)) {
      this.loadingService.begin();
      this.router.navigate(['/login']);
    }
  }
}
