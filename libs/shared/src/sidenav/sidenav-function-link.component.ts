import { Component, Input, OnInit } from '@angular/core';

import { SidenavSection } from './sidenav.model';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sf-sidenav-function-link',
  template: `
    <a
      class="nav-link"
      (click)="section.func()"
      [attr.aria-label]="section.name | async">
      <mat-icon *ngIf="section.icon">{{section.icon}}</mat-icon>
      {{section.name | async}}
    </a>
  `
})
export class SidenavFunctionLinkComponent implements OnInit {
  @Input() section: SidenavSection;

  constructor(private sidenavService: SidenavService) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setSection();
  }

  /**
   * Sets the section parameters to Observables.
   */
  setSection() {
    this.section = this.sidenavService.setSections([this.section])[0];
  }
}
