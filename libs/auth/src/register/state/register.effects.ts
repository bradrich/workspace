import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { Account } from '../../account/account.model';
import { RegisterService } from '../register.service';
import { Register, RegisterActionTypes, RegisterFail, RegisterSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {
  @Effect()
  register$ = this.actions$.pipe(
    ofType(RegisterActionTypes.Register),
    map((action: Register) => action.payload),
    exhaustMap((account: Account) =>
      this.registerService
        .save(account)
        .pipe(
          map(() => new RegisterSuccess()),
          catchError((err: HttpErrorResponse) => of(new RegisterFail(err)))
        )
    )
  );

  constructor(private actions$: Actions, private registerService: RegisterService) {}
}
