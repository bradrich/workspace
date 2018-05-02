import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PasswordResetInitService extends ApiService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'account/reset_password/init');
  }

  /**
   * Initializes the account password reset process.
   * @param {string} email
   * @returns {Observable<any>}
   */
  save(email: string): Observable<any> {
    return this.httpClient.post(this.resourceUrl, email);
  }
}
