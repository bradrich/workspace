import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { sharedSelectors, SharedState } from '../reducers';
import { SidenavStateModel } from './sidenav-state.model';
import { SidenavSection } from './sidenav.model';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sf-sidenav-link',
  template: `
    <a
      class="nav-link"
      [ngClass]="{ 'active': (active | async) }"
      [routerLink]="section.route"
      [attr.aria-label]="section.name | async"
      *ngIf="section.route.indexOf('#') === -1">
      <mat-icon *ngIf="section.icon">{{section.icon}}</mat-icon>
      {{section.name | async}}
    </a>
    <a
      class="nav-link"
      [href]="section.route"
      [attr.aria-label]="section.name | async"
      *ngIf="section.route.indexOf('#') > -1">
      <mat-icon *ngIf="section.icon">{{section.icon}}</mat-icon>
      {{section.name | async}}
    </a>
  `
})
export class SidenavLinkComponent implements OnInit, OnDestroy {
  @Input() section: SidenavSection;

  active: Observable<boolean>;

  private onDestroy = new Subject();

  constructor(private store: Store<SharedState>, private sidenavService: SidenavService) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setSection();

    this.store
      .pipe(select(sharedSelectors.getSidenavStatus))
      .takeUntil(this.onDestroy)
      .subscribe((status: SidenavStateModel) => {
        this.active = this.setActive(status);
      });
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Sets the section parameters to Observables.
   */
  setSection() {
    this.section = this.sidenavService.setSections([this.section])[0];
  }

  /**
   * Compares the current route, route parent, and the forced highlight to the sidenav section in
   * order to see if the section is active.
   * @param {SidenavStateModel} status
   * @returns {Observable<boolean>}
   */
  setActive(status: SidenavStateModel): Observable<boolean> {
    const sectionName = <Observable<string>>this.section.name;

    return sectionName.map((name: string) => {
      const parentRouteName = status.parentRouteName
        ? status.parentRouteName.toLowerCase().replace(' ', '')
        : null;
      const routeName = status.routeName ? status.routeName.toLowerCase().replace(' ', '') : null;
      const forcedHighlight = status.forcedHighlight
        ? status.forcedHighlight.toLowerCase().replace(' ', '')
        : null;

      name = name.toLowerCase().replace(' ', '');

      const currentParentName = parentRouteName === name;
      const currentRouteName = routeName === name;
      const currentHighlight = forcedHighlight === name;

      return currentParentName || currentRouteName || currentHighlight;
    });
  }
}
