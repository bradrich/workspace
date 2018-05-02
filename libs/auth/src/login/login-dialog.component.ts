import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConstantsHelper, IConstants } from '@swampfox/shared';

import { State as AuthState } from '../reducers';
import { LoginCredentials } from './login-credentials.model';
import { Login } from './state/login.actions';

@Component({
  selector: 'sf-login-dialog',
  template: `
    <div class="sf-auth-image">
      <img [src]="assets.swampfoxLogoAuth" alt="Swampfox" width="175" />
    </div>
    <div class="sf-auth-content">

      <h1>{{appConstants.appAbbreviation.toUpperCase()}} - Dashboard</h1>
      <p class="tag">Sign in to your account</p>

      <sf-login-form (login)="login($event)"></sf-login-form>

    </div>
  `
})
export class LoginDialogComponent implements OnInit {
  appConstants: IConstants;
  assets: any;

  constructor(private store: Store<AuthState>) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();

    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };
  }

  /**
   * Handles the `login` event from the `LoginFormComponent` by dispatching the `credentials` to the
   * `Login` `Action`.
   * @param {LoginCredentials} credentials
   */
  login(credentials: LoginCredentials) {
    this.store.dispatch(new Login(credentials));
  }
}
