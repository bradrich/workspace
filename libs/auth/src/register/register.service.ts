import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';

import { Account } from '../account/account.model';

@Injectable()
export class RegisterService extends ApiService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'register');
  }

  /**
   * Registers a user account.
   * @param {Account} account
   * @returns {Observable<Account>}
   */
  save(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(this.resourceUrl, account);
  }
}
