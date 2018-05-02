import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LogoutService } from '../logout.service';
import { LogoutActionTypes } from './logout.actions';

@Injectable()
export class LogoutEffects {
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(LogoutActionTypes.Logout),
    tap((authed) => {
      this.logoutService.logout();
    })
  );

  constructor(private actions$: Actions, private logoutService: LogoutService) {}
}
