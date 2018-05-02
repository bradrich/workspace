import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertService } from './alert.service';

@Injectable()
export class AlertInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone();

    return next.handle(request).catch((err: HttpErrorResponse) => {
      switch (err.status) {
        // Server not reachable or connection refused.
        case 0:
          this.alertService.show(`Server not reachable.`, 'danger');
          break;

        // Bad request.
        case 400:
          console.log(err);
          break;

        // Not found.
        case 404:
          this.alertService.show(
            `Resource not found: The resources required for your request cannot be found as this
                    time.`,
            'danger'
          );
          break;

        // Method not allowed.
        case 405:
          this.alertService.show(`${err.error.title}: ${err.error.detail}`, 'danger');
          break;

        // Server error.
        case 500:
          this.alertService.show(
            `Server error: An error occurred while making your request.`,
            'danger'
          );
          break;

        // Gateway timeout.
        case 504:
          this.alertService.show(
            `Gateway timeout: The application is not properly connected to the server.`,
            'danger'
          );
          break;

        default:
          console.log(err);
          break;
      }

      return Observable.throw(err);
    });
  }
}
