import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { PasswordStrengthValidator, SfValidators } from '@swampfox/shared';
import { Subject } from 'rxjs/Subject';

import { authSelectors, State as AuthState } from '../reducers';
import { AccountSecurityUpdate } from './state/account-security.actions';

@Component({
  selector: 'sf-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isPasswordType = true;
  pending$ = this.store.pipe(select(authSelectors.getAccountSecurityPending));
  success$ = this.store.pipe(select(authSelectors.getAccountSecuritySuccess));
  error$ = this.store.pipe(select(authSelectors.getAccountSecurityError));

  private onDestroy = new Subject();

  constructor(
    private injector: Injector,
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setForm();
    this.watchSuccess();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Cancels the form after successful save.
   */
  watchSuccess() {
    this.success$.takeUntil(this.onDestroy).subscribe((success: boolean) => {
      if (success) {
        this.cancel();
      }
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
   * Updates the account's password.
   */
  submit() {
    this.store.dispatch(new AccountSecurityUpdate(this.form.get('password').value));
  }

  /**
   * Resets the form.
   */
  cancel() {
    this.isPasswordType = true;

    const obj = {
      password: null,
      confirmPassword: null
    };
    this.form.reset(obj);
  }
}
