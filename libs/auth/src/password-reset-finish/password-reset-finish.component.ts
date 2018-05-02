import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  ConstantsHelper,
  IConstants,
  PasswordStrengthValidator,
  SfValidators
} from '@swampfox/shared';

import { authSelectors, State as AuthState } from '../reducers';
import { PasswordResetFinish } from './state/password-reset-finish.actions';

@Component({
  selector: 'sf-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.scss']
})
export class PasswordResetFinishComponent implements OnInit {
  appConstants: IConstants;
  assets: any;

  key: string;
  keyMissing = false;
  form: FormGroup;
  isPasswordType = true;
  pending$ = this.store.pipe(select(authSelectors.getPasswordResetFinishPending));
  success$ = this.store.pipe(select(authSelectors.getPasswordResetFinishSuccess));
  error$ = this.store.pipe(select(authSelectors.getPasswordResetFinishError));

  constructor(
    private injector: Injector,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AuthState>
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();

    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };

    this.getKey();

    this.setForm();
  }

  /**
   * Gets the password reset key from `ActivatedRoute` `queryParams`.
   */
  getKey() {
    this.route.queryParams.first().subscribe((params) => {
      this.key = params['key'];
      this.keyMissing = !this.key;
    });
  }

  /**
   * Sets `form`.
   */
  setForm() {
    const password = new FormControl('', [
      Validators.required,
      SfValidators.rangeLength([8, 100]),
      PasswordStrengthValidator.validate(this.injector)
    ]);
    const confirmPassword = new FormControl('', [
      Validators.required,
      SfValidators.equalTo(password, 'password')
    ]);

    this.form = this.formBuilder.group({
      password: password,
      confirmPassword: confirmPassword
    });
  }

  /**
   * Finishes the password reset of the account associated with the key.
   */
  submit() {
    this.store.dispatch(
      new PasswordResetFinish({
        key: this.key,
        newPassword: this.form.get('password').value
      })
    );
  }
}
