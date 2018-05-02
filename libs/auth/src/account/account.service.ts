import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiService } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';
import { filter, take, tap } from 'rxjs/operators';

import { authSelectors, State as AuthState } from '../reducers';
import { Account } from './account.model';
import { AccountGet } from './state/account.actions';

@Injectable()
export class AccountService extends ApiService<Account> {
  constructor(httpClient: HttpClient, private store: Store<AuthState>) {
    super(httpClient, 'account');
  }

  /**
   * Gets the current authenticated account from `authStore` or from the API.
   * @returns {Observable<Account>}
   */
  getFromStoreOrApi(): Observable<Account> {
    return this.store.pipe(
      select(authSelectors.getAccount),
      tap((account: Account) => {
        if (!account) {
          this.store.dispatch(new AccountGet());
        }
      }),
      filter((account: Account) => !!account),
      take(1)
    );
  }

  /**
   * Gets the current authenticated account account.
   * @returns {Observable<Account>}
   */
  get(): Observable<Account> {
    return this.httpClient.get<Account>(this.resourceUrl);
  }

  /**
   * Saves any changes to the current authenticated account account.
   * @param {Account} account
   * @returns {Observable<Account>}
   */
  save(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(this.resourceUrl, account);
  }

  /**
   * Saves a new password for the current authenticated account account.
   * @param {string} newPassword
   * @returns {Observable<Account>}
   */
  changePassword(newPassword: string): Observable<Account> {
    return this.httpClient.post<Account>(`${this.resourceUrl}/change-password`, newPassword);
  }
}
