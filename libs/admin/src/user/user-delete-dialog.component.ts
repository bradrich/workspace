import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { adminSelectors, AdminState } from '../reducers';
import { UserDelete } from './state/user.actions';
import { User } from './user.model';

@Component({
  selector: 'sf-user-delete-dialog',
  template: `
    <mat-toolbar color="primary">

      <h4 class="m-0">Confirm delete operation</h4>
      <button class="btn btn-icon" [mat-dialog-close]="true">
        <mat-icon>close</mat-icon>
      </button>

    </mat-toolbar>
    <mat-dialog-content>

      <div *ngIf="users && users.length > 1">
        <p>Are you sure you want to delete these Users?</p>
        <ul>
          <li *ngFor="let user of users"><strong>{{user.login}}</strong></li>
        </ul>
      </div>

      <p class="mb-3" *ngIf="users && users.length === 1">
        Are you sure you want to delete the User <strong>{{users[0].login}}</strong>?
      </p>

    </mat-dialog-content>
    <mat-dialog-actions class="d-flex flex-row align-items-center">

      <button class="btn" [mat-dialog-close]="false">Cancel</button>
      <button class="btn btn-danger ml-auto" [mat-dialog-close]="true">Confirm</button>

    </mat-dialog-actions>
  `
})
export class UserDeleteDialogComponent implements OnInit, OnDestroy {
  pending$ = this.adminStore.pipe(select(adminSelectors.getUserDeletePending));
  success$ = this.adminStore.pipe(select(adminSelectors.getUserDeleteSuccess));

  users: User[];

  private onDestroy = new Subject();

  constructor(
    public matDialogRef: MatDialogRef<UserDeleteDialogComponent>,
    private adminStore: Store<AdminState>
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.watchSuccess();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Watches the delete success selector.
   */
  watchSuccess() {
    this.success$.takeUntil(this.onDestroy).subscribe(() => {
      this.matDialogRef.close();
    });
  }

  /**
   * Deletes all of the requested users.
   */
  confirm() {
    this.users.forEach((user: User) => {
      this.adminStore.dispatch(new UserDelete(user));
    });
  }
}
