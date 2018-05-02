import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConstantsHelper } from '@swampfox/shared';
import { Observable } from 'rxjs/Observable';

import { Logout } from '../logout/state/logout.actions';
import { State as AuthState } from '../reducers';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authStore: Store<AuthState>, private tokenService: TokenService) {}

  /**
   * Intercepts all HTTP requests and adds the appropriate `Authorization` header for the REST
   * services to verify authentication.
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const appApiUri = ConstantsHelper.getConstants().appApiUri;

    // If the request does not require an API token (outside requests do not), then pass the request
    // along.
    if (
      !request ||
      !request.url ||
      (/^http/.test(request.url) && !(appApiUri && request.url.startsWith(appApiUri)))
    ) {
      return next.handle(request);
    }

    // Set the `Authorization` token for each API outgoing request.
    const token = this.tokenService.getToken();
    if (!!token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).do(
      (event: HttpEvent<any>) => {
        // Success!
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // If the token has expired, logout from the application.
          this.authStore.dispatch(new Logout());
        }
      }
    );
  }
}
