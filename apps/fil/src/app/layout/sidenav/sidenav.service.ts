import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Account,
  authRoleAdmin,
  authRoleUser,
  authSelectors,
  AuthState,
  Logout
} from '@swampfox/auth';
import { AboutService, Sidenav } from '@swampfox/shared';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable()
export class SidenavService {
  sidenav: Sidenav = {
    sections: [
      {
        name: 'Dashboard',
        type: 'link',
        icon: 'explore',
        route: '/dashboard',
        isHidden: this.authStore.pipe(
          select(authSelectors.getAccount),
          map(
            (account: Account) =>
              !(
                account && _.intersection(account.authorities, [authRoleUser, authRoleAdmin]).length
              )
          )
        )
      },
      {
        name: 'User Management',
        type: 'link',
        icon: 'people',
        route: '/admin/users',
        isHidden: this.authStore.pipe(
          select(authSelectors.getAccount),
          map(
            (account: Account) =>
              !(account && _.intersection(account.authorities, [authRoleAdmin]).length)
          )
        )
      },
      {
        name: 'About Dashboard',
        type: 'function',
        icon: 'lightbulb_outline',
        func: () => this.aboutService.openDialog(),
        isHidden: false
      }
    ],
    accountSections: [
      {
        name: this.authStore.pipe(
          select(authSelectors.getAccount),
          map((account: Account) => (account ? `${account.firstName} ${account.lastName}` : ''))
        ),
        type: 'toggle',
        toggleIcon: 'arrow_drop_down',
        isHidden: false,
        isAccount: true,
        pages: [
          {
            name: 'Account Settings',
            type: 'link',
            route: '/account/settings',
            isHidden: false
          },
          {
            name: 'Account Security',
            type: 'link',
            route: '/account/security',
            isHidden: false
          },
          {
            name: 'Sign Out',
            type: 'function',
            func: () => this.authStore.dispatch(new Logout()),
            isHidden: false
          }
        ]
      }
    ],
    signInSections: [
      {
        name: 'Sign In',
        type: 'function',
        icon: 'lock',
        func: () => this.authStore.dispatch(new Logout()),
        isHidden: false
      }
    ]
  };

  constructor(private authStore: Store<AuthState>, private aboutService: AboutService) {}
}
