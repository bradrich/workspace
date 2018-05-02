import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthRole, authUserDefaultPassword } from '@swampfox/auth';
import { AlertService, ApiParams } from '@swampfox/shared';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { User } from '../user.model';
import { UserService } from '../user.service';
import {
  UserActionTypes,
  UserCreate,
  UserCreateFail,
  UserCreateSuccess,
  UserDelete,
  UserDeleteFail,
  UserDeleteSuccess,
  UserGet,
  UserGetAll,
  UserGetAllFail,
  UserGetAllSuccess,
  UserGetAuthoritiesFail,
  UserGetAuthoritiesSuccess,
  UserGetFail,
  UserGetSuccess,
  UserResetPassword,
  UserResetPasswordFail,
  UserResetPasswordSuccess,
  UserUpdate,
  UserUpdateFail,
  UserUpdateSuccess
} from './user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  create$ = this.actions$.pipe(
    ofType(UserActionTypes.UserCreate),
    map((action: UserCreate) => action.payload),
    exhaustMap((user: User) =>
      this.userService
        .create(user)
        .pipe(
          map(() => new UserCreateSuccess()),
          catchError((err: HttpErrorResponse) => of(new UserCreateFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.UserCreateSuccess),
    tap(() => {
      this.alertService.show('User creation success!', 'success');
    })
  );

  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(UserActionTypes.UserGetAll),
    map((action: UserGetAll) => action.payload),
    exhaustMap((params: ApiParams) =>
      this.userService.query(params).pipe(
        map((response: HttpResponse<User[]>) => {
          const headers: any = response.headers;
          return new UserGetAllSuccess(response.body, headers.get('X-Total-Count'));
        }),
        catchError((err: HttpErrorResponse) => of(new UserGetAllFail(err)))
      )
    )
  );

  @Effect()
  get$ = this.actions$.pipe(
    ofType(UserActionTypes.UserGet),
    map((action: UserGet) => action.payload),
    exhaustMap((login: string) =>
      this.userService
        .findOneByLogin(login)
        .pipe(
          map((user: User) => new UserGetSuccess(user)),
          catchError((err: HttpErrorResponse) => of(new UserGetFail(err)))
        )
    )
  );

  @Effect()
  getAuthorities$ = this.actions$.pipe(
    ofType(UserActionTypes.UserGetAuthorities),
    exhaustMap(() =>
      this.userService
        .getAuthorities()
        .pipe(
          map((authorities: AuthRole[]) => new UserGetAuthoritiesSuccess(authorities)),
          catchError((err: HttpErrorResponse) => of(new UserGetAuthoritiesFail(err)))
        )
    )
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType(UserActionTypes.UserUpdate),
    map((action: UserUpdate) => action.payload),
    exhaustMap((user: User) =>
      this.userService
        .update(user)
        .pipe(
          map((u: User) => new UserUpdateSuccess(u)),
          catchError((err: HttpErrorResponse) => of(new UserUpdateFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.UserUpdateSuccess),
    tap(() => {
      this.alertService.show('User has been updated successfully!', 'success');
    })
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(UserActionTypes.UserDelete),
    map((action: UserDelete) => action.payload),
    exhaustMap((user: User) =>
      this.userService
        .delete(user.login)
        .pipe(
          map(() => new UserDeleteSuccess(user)),
          catchError((err: HttpErrorResponse) => of(new UserDeleteFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.UserDeleteSuccess),
    tap(() => {
      this.alertService.show('User has been deleted successfully!', 'success');
    })
  );

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType(UserActionTypes.UserResetPassword),
    map((action: UserResetPassword) => action.payload),
    exhaustMap((user: User) =>
      this.userService
        .resetPassword(user.login)
        .pipe(
          map(() => new UserResetPasswordSuccess(user)),
          catchError((err: HttpErrorResponse) => of(new UserResetPasswordFail(err)))
        )
    )
  );

  @Effect({ dispatch: false })
  resetPasswordSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.UserResetPasswordSuccess),
    map((action: UserResetPasswordSuccess) => action.payload),
    tap((user: User) => {
      this.alertService.show(
        `
        The password for User ${user.login} has been successfully reset to
        ${authUserDefaultPassword}.
      `,
        'success'
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private alertService: AlertService
  ) {}
}
