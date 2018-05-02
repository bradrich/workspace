import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ConstantsHelper, IConstants, SfValidators } from '@swampfox/shared';

import { authSelectors, State as AuthState } from '../reducers';
import { PasswordResetInit } from './state/password-reset-init.actions';

@Component({
  selector: 'sf-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['./password-reset-init.component.scss']
})
export class PasswordResetInitComponent implements OnInit {
  appConstants: IConstants;
  assets: any;

  form: FormGroup;
  pending$ = this.store.pipe(select(authSelectors.getPasswordResetInitPending));
  success$ = this.store.pipe(select(authSelectors.getPasswordResetInitSuccess));
  error$ = this.store.pipe(select(authSelectors.getPasswordResetInitError));

  constructor(private formBuilder: FormBuilder, private store: Store<AuthState>) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();

    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };

    this.setForm();
  }

  /**
   * Sets `form`.
   */
  setForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        SfValidators.rangeLength([5, 100]),
        SfValidators.email
      ])
    });
  }

  /**
   * Requests a password reset of the account associated with the specified email.
   */
  submit() {
    this.store.dispatch(new PasswordResetInit(this.form.get('email').value));
  }
}
