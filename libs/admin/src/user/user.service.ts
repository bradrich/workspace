import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authUserDefaultPassword } from '@swampfox/auth';
import { ApiService } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class UserService extends ApiService<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  /**
   * Finds a `User` by their login.
   * @param {string} login
   * @returns {Observable<User>}
   */
  findOneByLogin(login: string): Observable<User> {
    return this.httpClient.get<User>(`${this.resourceUrl}/${login}`);
  }

  /**
   * Gets all of the authority roles.
   * @returns {Observable<string[]>}
   */
  getAuthorities(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.resourceUrl}/authorities`);
  }

  /**
   * Resets the password of the `User` with the requested login.
   * @param {string} login
   * @returns {Observable<User>}
   */
  resetPassword(login: string): Observable<User> {
    return this.httpClient.post<User>(
      `${this.resourceUrl}/${login}/reset_password`,
      authUserDefaultPassword
    );
  }
}
