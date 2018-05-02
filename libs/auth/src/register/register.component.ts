import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  ConstantsHelper,
  IConstants,
  PasswordStrengthValidator,
  SfValidators
} from '@swampfox/shared';

import { authSelectors, State as AuthState } from '../reducers';
import { Register } from './state/register.actions';

@Component({
  selector: 'sf-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constants: IConstants;
  assets: any;

  form: FormGroup;
  isPasswordType = true;
  pending$ = this.store.pipe(select(authSelectors.getRegisterPending));
  success$ = this.store.pipe(select(authSelectors.getRegisterSuccess));
  error$ = this.store.pipe(select(authSelectors.getRegisterError));

  constructor(
    private injector: Injector,
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.constants = ConstantsHelper.getConstants();

    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };

    this.setForm();
  }

  /**
   * Sets `form`.
   */
  setForm() {
    const login = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      Validators.pattern(/^[_'.@A-Za-z0-9-]*$/)
    ]);
    const email = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      SfValidators.email
    ]);
    const password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
      PasswordStrengthValidator.validate(this.injector)
    ]);
    const confirmPassword = new FormControl('', [
      Validators.required,
      SfValidators.equalTo(password, 'password')
    ]);

    this.form = this.formBuilder.group({
      login: login,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    });
  }

  /**
   * Registers the requested user account.
   */
  submit() {
    const account = {
      login: this.form.get('login').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      langKey: this.constants.appDefaultLangKey
    };
    this.store.dispatch(new Register(account));
  }
}
