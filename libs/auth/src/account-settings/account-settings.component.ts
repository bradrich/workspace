import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SfValidators, UnsavedChangesService } from '@swampfox/shared';
import { Subject } from 'rxjs/Subject';

import { Account } from '../account/account.model';
import { authSelectors, State as AuthState } from '../reducers';
import { AccountSettingsUpdate } from './state/account-settings.actions';

@Component({
  selector: 'sf-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  loading = false;
  account$ = this.store.pipe(select(authSelectors.getAccount));
  account: Account;

  form: FormGroup;
  pending$ = this.store.pipe(select(authSelectors.getAccountSettingsPending));
  success$ = this.store.pipe(select(authSelectors.getAccountSettingsSuccess));
  error$ = this.store.pipe(select(authSelectors.getAccountSettingsError));

  private onDestroy = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private unsavedChangesService: UnsavedChangesService
  ) {
    this.loading = true;
  }

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.getAccount();
    this.watchSuccess();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Gets `account` from the store.
   */
  getAccount() {
    this.account$.takeUntil(this.onDestroy).subscribe((account: Account) => {
      this.account = account;
      if (this.form === undefined) {
        this.setForm();
      }
    });
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
    this.form = this.formBuilder.group({
      firstName: new FormControl(this.account.firstName, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      lastName: new FormControl(this.account.lastName, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email: new FormControl(this.account.email, [
        Validators.required,
        SfValidators.rangeLength([5, 100]),
        SfValidators.email
      ]),
      langKey: new FormControl(this.account.langKey, [Validators.required])
    });

    this.loading = false;
  }

  /**
   * Updates the account's account.
   */
  submit() {
    const account = new Account(Object.assign({}, this.account, this.form.value));
    this.store.dispatch(new AccountSettingsUpdate(account));
  }

  /**
   * Resets the form.
   */
  cancel() {
    this.form.reset(this.account);
  }

  /**
   * Allows the account to cancel their changes to their settings and leave the page.
   * @returns {(Promise<boolean> | boolean)}
   */
  canDeactivate(): Promise<boolean> | boolean {
    return this.unsavedChangesService.handle(this.account, this.form);
  }
}
