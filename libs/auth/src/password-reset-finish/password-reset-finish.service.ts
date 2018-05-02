import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PasswordResetFinishService extends ApiService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'account/reset_password/finish');
  }

  /**
   * Finishes the account password reset process.
   * @param {*} keyAndPassword
   * @returns {Observable<any>}
   */
  save(keyAndPassword: any): Observable<any> {
    return this.httpClient.post(this.resourceUrl, keyAndPassword);
  }
}
