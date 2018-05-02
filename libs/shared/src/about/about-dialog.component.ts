import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ConstantsHelper } from '../constants/constants.helper';
import { IConstants } from '../constants/constants.model';

@Component({
  selector: 'sf-about-dialog',
  template: `
    <div class="sf-auth-image">
      <img [src]="assets.swampfoxLogoAuth" alt="Swampfox" width="175" />
    </div>
    <div class="sf-auth-content">

      <h1>{{appConstants.appName}} - Dashboard</h1>
      <h2 class="mt-3 mb-4">Version {{appConstants.appVersion}}</h2>

      <button class="btn btn-primary mb-4" (click)="matDialogRef.close()">Close</button>

    </div>
  `
})
export class AboutDialogComponent implements OnInit {
  appConstants: IConstants;
  assets: any;

  constructor(public matDialogRef: MatDialogRef<AboutDialogComponent>) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();
    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };
  }
}
