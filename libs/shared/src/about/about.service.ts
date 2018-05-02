import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AboutDialogComponent } from './about-dialog.component';

@Injectable()
export class AboutService {
  constructor(private matDialog: MatDialog) {}

  /**
   * Opens `AboutDialogComponent`.
   */
  openDialog() {
    let matDialogRef: MatDialogRef<AboutDialogComponent>;
    matDialogRef = this.matDialog.open(AboutDialogComponent, {
      panelClass: 'sf-auth-dialog',
      hasBackdrop: true
    });
  }
}
