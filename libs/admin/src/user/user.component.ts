import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { authSelectors, State as AuthState } from '@swampfox/auth';
import {
  AlertService,
  ApiParams,
  paginationItemsPerPage,
  PaginationService,
  PagingOptions,
  TableButtonClickOptions,
  TableConfig,
  TableMenuClickOptions,
  TableSortOptions
} from '@swampfox/shared';
import { LocalStorageService } from 'ngx-webstorage';

import { adminSelectors, State as AdminState } from '../reducers';
import { UserGetAll, UserRefreshDataTable, UserSelect, UserUpdate } from './state/user.actions';
import { UserDeleteDialogComponent } from './user-delete-dialog.component';
import { UserResetPasswordDialogComponent } from './user-reset-password-dialog.component';
import { userPredicates, userTableConfig } from './user.constants';
import { User } from './user.model';

@Component({
  selector: 'sf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pending$ = this.adminStore.pipe(select(adminSelectors.getUserPending));
  refreshing$ = this.adminStore.pipe(select(adminSelectors.getUserRefreshing));
  error$ = this.adminStore.pipe(select(adminSelectors.getUserError));
  users$ = this.adminStore.pipe(select(adminSelectors.getUserUsers));
  totalCount$ = this.adminStore.pipe(select(adminSelectors.getUserTotalCount));
  selectedUsers$ = this.adminStore.pipe(select(adminSelectors.getUserSelectedUsers));
  currentUser$ = this.authStore.pipe(select(authSelectors.getAccount));

  tableConfig: TableConfig;
  page: number;
  itemsPerPage: number;
  predicate: string;
  reverse: boolean;
  totalItems: number;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private localStorage: LocalStorageService,
    private adminStore: Store<AdminState>,
    private authStore: Store<AuthState>,
    private alertService: AlertService,
    private paginationService: PaginationService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.tableConfig = userTableConfig;
    this.setPagination();
    this.getUsers();
  }

  /**
   * Sets the paging information based on stored values from the `LocalStorageService`.
   */
  setPagination() {
    this.page = 1;
    this.predicate = this.localStorage.retrieve('userPredicate') || userPredicates[0];
    this.reverse =
      this.localStorage.retrieve('userReverse') !== null
        ? this.localStorage.retrieve('userReverse')
        : true;
    this.itemsPerPage = this.localStorage.retrieve('userItemsPerPage') || paginationItemsPerPage;
  }

  /**
   * Dispatches an action to the store to get a page of the users.
   */
  getUsers() {
    const params: ApiParams = {
      page: (this.page - 1).toString(),
      size: this.itemsPerPage.toString(),
      sort: this.paginationService.parseSort(this.predicate, this.reverse, true)
    };
    this.adminStore.dispatch(new UserGetAll(params));
  }

  refreshUserList() {
    console.log('Refreshing user list.');
  }

  /**
   * Sorts the users after a `sortEntities` action from the `TableComponent`.
   * @param {TableSortOptions} options Contains the following:
   *   {string} predicate
   *   {boolean} predicate
   */
  sortUsers(options: TableSortOptions) {
    this.page = 1;

    this.predicate = options.predicate || this.predicate;
    this.localStorage.store('userPredicate', this.predicate);

    this.reverse = options.reverse !== undefined ? options.reverse : this.reverse;
    this.localStorage.store('userReverse', this.reverse);

    this.adminStore.dispatch(new UserRefreshDataTable());
    this.getUsers();
    this.cancelEdit();
  }

  /**
   * Changes the paging options and requests the users from the store.
   * @param {PagingOptions} options Contains the following:
   *   {number} page
   *   {number} itemsPerPage
   */
  changePaging(options: PagingOptions) {
    if (options.page) {
      this.page = options.page;
    } else if (options.itemsPerPage) {
      this.page = 1;
      this.itemsPerPage = options.itemsPerPage;
      this.localStorage.store('userItemsPerPage', this.itemsPerPage);
    }

    this.getUsers();
    this.cancelEdit();
  }

  /**
   * Dispatches a new user creation request to the store.
   */
  createUser() {
    this.adminStore.dispatch(new UserSelect([new User()]));
  }

  /**
   * Dispatches the selected users to the store.
   * @param {User[]} users
   */
  selectUsers(users: User[]) {
    this.adminStore.dispatch(new UserSelect(users));
  }

  /**
   * Handles the event from a table button click action.
   * @param {TableButtonClickOptions} options Contains the following:
   *   {User} entity
   *   {column} TableColumn
   */
  buttonClick(options: TableButtonClickOptions) {
    if (!options.entity && !options.column) {
      throw new Error(`
        UserComponent: Table buttons are required to return a User and a TableColumn when interacted
        with.
      `);
    }

    if (options.column.button.action === 'setParameter') {
      const user = new User(options.entity);
      user[options.column.model] = !user[options.column.model];
      this.adminStore.dispatch(new UserUpdate(user));
    }
  }

  /**
   * Handles the event from the action menu click action.
   * @param {TableMenuClickOptions} options Contains the folloowing:
   *   {User} entity
   *   {TableMenuItem} menuItem
   */
  actionMenuClick(options: TableMenuClickOptions) {
    if (!options.entity && !options.menuItem) {
      throw new Error(`
        UserComponent: Action menu items are required to return a User and a TableMenuItem when
        interacted with.
      `);
    }

    if (options.menuItem.action === 'delete') {
      this.deleteUsers([options.entity]);
    } else if (options.menuItem.action === 'resetPassword') {
      this.resetUserPassword(options.entity);
    }
  }

  /**
   * Opens `UserResetPasswordDialogComponent` in order for the user to confirm the password reset
   * action.
   * @param {User} user
   */
  resetUserPassword(user: User) {
    let matDialogRef: MatDialogRef<UserResetPasswordDialogComponent>;
    matDialogRef = this.matDialog.open(UserResetPasswordDialogComponent);
    matDialogRef.componentInstance.user = user;
  }

  /**
   * Dispatches an event to cancel the edit and selection of all users.
   */
  cancelEdit() {
    this.adminStore.dispatch(new UserSelect([]));
  }

  /**
   * Opens the deletion dialog.
   * @param {User[]} users
   */
  deleteUsers(users: User[]) {
    if (users && users.length) {
      let matDialogRef: MatDialogRef<UserDeleteDialogComponent>;
      matDialogRef = this.matDialog.open(UserDeleteDialogComponent);
      matDialogRef.componentInstance.users = users;
      matDialogRef
        .afterClosed()
        .first()
        .subscribe((result: boolean) => {
          this.cancelEdit();
        });
    } else {
      this.alertService.show('There are no Users selected that can be deleted.', 'danger');
    }
  }
}
