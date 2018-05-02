import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { ConstantsHelper } from '../constants/constants.helper';
import { IConstants } from '../constants/constants.model';

@Component({
  selector: 'sf-footer',
  template: `
    <ul class="navbar-nav flex-row mr-auto">
      <li class="nav-item">
        <a class="nav-link" routerLink="/dashboard" aria-label="Dashboard">Dashboard</a>
      </li>
    </ul>
    <ul class="navbar-nav flex-row">
      <li class="nav-item d-xs-none">
        <span class="nav-link">
          {{appConstants.appAbbreviation.toUpperCase()}} v{{appConstants.appVersion}}
        </span>
      </li>
      <li class="nav-item d-xs-none">
        <span class="nav-link">&copy; {{currentYear}} Swampfox, Inc.</span>
      </li>
      <li class="nav-item">
        <a
          class="btn btn-primary btn-raised ml-2"
          href="http://support.swampfoxinc.com/"
          target="_blank">
          Support
        </a>
      </li>
    </ul>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appConstants: IConstants;
  currentYear: string;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();
    this.currentYear = moment().format('YYYY');
  }
}
