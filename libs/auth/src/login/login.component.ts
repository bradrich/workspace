import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConstantsHelper, IConstants, LoadingService } from '@swampfox/shared';

import { State as AuthState } from '../reducers';
import { LoginCredentials } from './login-credentials.model';
import { Login } from './state/login.actions';

@Component({
  selector: 'sf-login',
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center sf-fade-in-up" fxFlex>

      <div class="sf-auth">
        <div class="sf-auth-image">
          <img [src]="assets.swampfoxLogoAuth" alt="Swampfox" width="175" />
        </div>
        <div class="sf-auth-content">

          <h1>{{appConstants.appAbbreviation.toUpperCase()}} - Dashboard</h1>
          <p class="tag">Sign in to your account</p>

          <sf-login-form (login)="login($event)"></sf-login-form>

        </div>
      </div>

      <button class="forgot" routerLink="/password-reset/request" aria-label="Forgot password?">
        Forgot password?
      </button>

      <div class="sf-auth-version">
        <p>Version {{appConstants.appVersion}}</p>
      </div>

    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appConstants: IConstants;
  assets: any;

  constructor(private store: Store<AuthState>, private loadingService: LoadingService) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();

    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };

    this.loadingService.finish();
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
