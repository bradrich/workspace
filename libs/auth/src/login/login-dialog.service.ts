import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LoginDialogComponent } from './login-dialog.component';

@Injectable()
export class LoginDialogService {
  isOpen = false;

  private matDialogRef: MatDialogRef<LoginDialogComponent>;

  constructor(private matDialog: MatDialog) {}

  /**
   * Opens the `LoginDialogComponent` dialog.
   */
  open() {
    if (this.isOpen) {
      return;
    }

    this.matDialogRef = this.matDialog.open(LoginDialogComponent, {
      disableClose: true,
      panelClass: 'sf-auth-dialog'
    });

    this.matDialogRef
      .afterOpen()
      .first()
      .subscribe(() => {
        this.isOpen = true;
      });

    this.matDialogRef
      .afterClosed()
      .first()
      .subscribe(() => {
        this.isOpen = false;
      });
  }

  /**
   * Closes the `LoginDialogComponent` dialog.
   */
  close() {
    if (this.isOpen) {
      this.matDialogRef.close();
    }
  }
}
