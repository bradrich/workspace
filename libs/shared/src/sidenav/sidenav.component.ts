import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { ConstantsHelper } from '../constants/constants.helper';
import { IConstants } from '../constants/constants.model';
import { Sidenav, SidenavSection } from './sidenav.model';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  @Input() userPending: boolean;
  @Input() userAuthenticated: boolean;
  @Input() sidenavModel: Sidenav;

  appConstants: IConstants;
  sections: SidenavSection[];
  accountSections: SidenavSection[];
  signInSections: SidenavSection[];

  constructor(private sidenavService: SidenavService) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();
    this.setSections();
  }

  /**
   * Sets the sidenav sections.
   */
  setSections() {
    this.sections = this.sidenavService.setSections(this.sidenavModel.sections);
    this.accountSections = this.sidenavModel.accountSections
      ? this.sidenavService.setSections(this.sidenavModel.accountSections)
      : [];
    this.signInSections = this.sidenavModel.signInSections
      ? this.sidenavService.setSections(this.sidenavModel.signInSections)
      : [];
  }
}
