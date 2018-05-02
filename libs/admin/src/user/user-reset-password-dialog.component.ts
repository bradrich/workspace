import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { State as AdminState } from '../reducers';
import { UserResetPassword } from './state/user.actions';
import { User } from './user.model';

@Component({
  selector: 'sf-user-reset-password-dialog',
  template: `
    <mat-toolbar color="primary">
      <div class="navbar-brand">Confirm password reset</div>
      <button class="btn btn-icon ml-auto text-white" (click)="matDialogRef.close(false)">
        <mat-icon>close</mat-icon>
      </button>
    </mat-toolbar>
    <mat-dialog-content>
      <p class="mb-2">
        Are you sure you want to reset the password for User: <strong>{{user.login}}</strong>?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button class="btn btn-info ml-auto" (click)="reset()">Reset</button>
    </mat-dialog-actions>
  `
})
export class UserResetPasswordDialogComponent {
  user: User;

  constructor(
    public matDialogRef: MatDialogRef<UserResetPasswordDialogComponent>,
    public adminStore: Store<AdminState>
  ) {}

  /**
   * Dispatches an event to the `Store` to reset the user's password.
   */
  reset() {
    this.adminStore.dispatch(new UserResetPassword(this.user));
    this.matDialogRef.close();
  }
}
