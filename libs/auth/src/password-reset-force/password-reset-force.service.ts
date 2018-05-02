import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { SessionStorageService } from 'ngx-webstorage';

import { Account } from '../account/account.model';
import { authUserDefaultPassword } from '../auth.constants';
import { authSelectors, State as AuthState } from '../reducers';
import { PasswordResetForceDialogComponent } from './password-reset-force-dialog.component';
import { PasswordResetForce } from './state/password-reset-force.actions';

@Injectable()
export class PasswordResetForceService {
  constructor(
    private matDialog: MatDialog,
    private store: Store<AuthState>,
    private sessionStorage: SessionStorageService
  ) {
    // Check for a stored value for forcing password reset.
    if (this.sessionStorage.retrieve('authForcePasswordReset')) {
      this.checkPassword(null, true);
    }
  }

  /**
   * Checks the requested password against the default account password.
   * @param {string} password
   * @param {boolean} [force]
   */
  checkPassword(password: string, force?: boolean) {
    if (password === authUserDefaultPassword || force) {
      this.sessionStorage.store(
        'authForcePasswordReset',
        password === authUserDefaultPassword || force
      );
      this.store.dispatch(new PasswordResetForce());
    }
  }

  /**
   * Opens the `PasswordResetForceDialogComponent` which will force the account to the account
   * security page in order for them to reset their password.
   */
  force() {
    this.store
      .pipe(select(authSelectors.getAccount))
      .first()
      .subscribe((account: Account) => {
        let matDialogRef: MatDialogRef<PasswordResetForceDialogComponent>;
        matDialogRef = this.matDialog.open(PasswordResetForceDialogComponent, {
          disableClose: true,
          panelClass: 'sf-auth-dialog'
        });
        matDialogRef.componentInstance.account = account;
      });
  }
}
