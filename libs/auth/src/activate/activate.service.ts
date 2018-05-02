import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivateService extends ApiService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'activate');
  }

  /**
   * Activates the account.
   * @param {string} key
   * @returns {Observable<any>}
   */
  get(key: string): Observable<any> {
    const params = new HttpParams().set('key', key);
    return this.httpClient.get(this.resourceUrl, { params: params });
  }
}
