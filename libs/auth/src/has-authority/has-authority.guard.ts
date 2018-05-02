import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { RouterService } from '@swampfox/shared';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { AuthRole } from '../auth.constants';
import { LoginDialogService } from '../login/login-dialog.service';

@Injectable()
export class HasAuthorityGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private loginDialogService: LoginDialogService,
    private routerService: RouterService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authorities = route.data['authorities'];

    return this.accountService
      .getFromStoreOrApi()
      .switchMap((account: Account) => {
        if (!authorities || !authorities.length) {
          // If there are no `AuthRoles` restrictions on the route, let the user continue.
          return of(true);
        }

        return this.checkLogin(state.url, account, authorities);
      })
      .catch((err: any) => {
        // There is not an authenticated account. Store the current route and then have them sign
        // in using the `LoginDialogComponent`.
        this.routerService.storeUrl(route.url);
        this.loginDialogService.open();

        return of(false);
      });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  checkLogin(url: string, account?: Account, authorities?: AuthRole[]): Observable<boolean> {
    if (account && _.intersection(account.authorities, authorities).length) {
      // If there is a current authenticated account and their authorities match the route's
      // required authorities, let the user continue.
      return of(true);
    } else {
      // If there is a current authenticated account and their authorities DO NOT match the
      // route's required authorities, send the user to the `/access-denied` route.
      this.router.navigate(['/access-denied']);
      return of(false);
    }
  }
}
