import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@swampfox/shared';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';

import { LoginCredentials } from '../login/login-credentials.model';

@Injectable()
export class TokenService extends ApiService<any> {
  private tokenName = 'authenticationToken';

  constructor(
    httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {
    super(httpClient, 'authenticate');
  }

  /**
   * Gets `authenticationToken` from `LocalStorageService` or `SessionStorageService`.
   * @returns {Object}
   */
  getToken(): Object {
    return (
      this.localStorage.retrieve(this.tokenName) || this.sessionStorage.retrieve(this.tokenName)
    );
  }

  /**
   * Stores `authenticationToken` in `LocalStorageService` if the user wants the app to remember
   * them, and in `SessionStorageService` if not.
   * @param {*} jwt
   * @param {boolean} rememberMe
   */
  storeToken(jwt: any, rememberMe: boolean) {
    if (rememberMe) {
      this.localStorage.store(this.tokenName, jwt);
    } else {
      this.sessionStorage.store(this.tokenName, jwt);
    }
  }

  /**
   * Creates a JWT.
   * @param {LoginCredentials} creds
   * @returns {Observable<any>}
   */
  createToken(creds: LoginCredentials): Observable<any> {
    const data: LoginCredentials = {
      username: creds.username,
      password: creds.password,
      rememberMe: creds.rememberMe
    };

    return this.httpClient
      .post(this.resourceUrl, data, {
        observe: 'response'
      })
      .map((response: HttpResponse<any>) => {
        const jwt = response.body.id_token;
        this.storeToken(jwt, creds.rememberMe);
        return jwt;
      });
  }

  /**
   * Uses an existing JWT for authentication.
   * @param {*} jwt
   * @param {boolean} rememberMe
   * @returns {Promise<any>}
   */
  useToken(jwt: any, rememberMe: boolean): Promise<any> {
    if (jwt) {
      this.storeToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      // Put appropriate error message here.
      return Promise.reject('auth-jwt-service Promise rejected.');
    }
  }

  /**
   * Destroys the stored JWT within `LocalStorageService` and `SessionStorageService`.
   * @returns {Observable<any>}
   */
  destroyToken(): Observable<any> {
    return new Observable((observer) => {
      this.localStorage.clear(this.tokenName);
      this.sessionStorage.clear(this.tokenName);
      observer.complete();
    });
  }
}
