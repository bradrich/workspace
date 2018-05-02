import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';

import { authRememberMeLocalStorageName, authUsernameLocalStorageName } from '../auth.constants';
import { authSelectors, State as AuthState } from '../reducers';
import { LoginCredentials } from './login-credentials.model';

@Component({
  selector: 'sf-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  @Output() login = new EventEmitter<any>();

  credentials = new LoginCredentials();
  form: FormGroup;
  pending$ = this.store.pipe(select(authSelectors.getLoginPending));

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private store: Store<AuthState>,
    private localStorage: LocalStorageService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setCredentials();
    this.setForm();
  }

  /**
   * Gets the account's stored auth credentials from `LocalStorageService` and pre-fills those
   * properties.
   */
  setCredentials() {
    const username = this.localStorage.retrieve(authUsernameLocalStorageName);
    const rememberMe = this.localStorage.retrieve(authRememberMeLocalStorageName);

    if (username) {
      this.credentials.username = username;
    }
    if (rememberMe) {
      this.credentials.rememberMe = rememberMe;
    }
  }

  /**
   * Sets `form` with `credentials`.
   */
  setForm() {
    this.form = this.formBuilder.group({
      username: new FormControl(this.credentials.username, [Validators.required]),
      password: new FormControl(this.credentials.password, [Validators.required]),
      rememberMe: new FormControl(this.credentials.rememberMe, [Validators.required])
    });
  }

  /**
   * Submits `form`.
   */
  submit() {
    this.credentials = new LoginCredentials(Object.assign(this.credentials, this.form.value));
    this.login.emit(this.credentials);
  }
}
