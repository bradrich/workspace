import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Account } from '../account/account.model';
import { authUserDefaultPassword } from '../auth.constants';

@Component({
  selector: 'sf-password-reset-force-dialog',
  template: `
    <div class="sf-auth-image">
      <img [src]="assets.swampfoxLogoAuth" alt="Swampfox" width="175" />
    </div>
    <div class="sf-auth-content">

      <h1>Hello {{account.firstName}} {{account.lastName}}</h1>

      <p>
        You signed in using the default password <strong>{{defaultPassword}}</strong>. You will need
        to reset your password in order to continue.
      </p>

      <button class="btn btn-primary mb-4" (click)="goToAccountSecurity()">Reset password</button>

    </div>
  `
})
export class PasswordResetForceDialogComponent implements OnInit {
  account: Account;
  assets: any;
  defaultPassword = authUserDefaultPassword;

  constructor(
    private matDialogRef: MatDialogRef<PasswordResetForceDialogComponent>,
    private router: Router
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };
  }

  /**
   * Sends the account to the account security page.
   */
  goToAccountSecurity() {
    this.matDialogRef.close();
    this.router.navigate(['/account/security']);
  }
}
