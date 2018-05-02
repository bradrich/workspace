import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { sharedSelectors, SharedState } from '../reducers';
import { SidenavStateModel } from './sidenav-state.model';
import { SidenavSection } from './sidenav.model';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sf-sidenav-toggle-link',
  template: `
    <button
      class="nav-link sf-sidenav-toggle-button"
      data-toggle="collapse"
      [attr.data-target]="'#sidenav' + (section.name | async | noSpaces)"
      [attr.aria-expanded]="!(collapsed | async)"
      [attr.aria-controls]="'sidenav' + (section.name | async | noSpaces)"
      [attr.aria-label]="section.name | async">
      <mat-icon *ngIf="section.icon">{{section.icon}}</mat-icon>
      {{section.name | async}}
      <mat-icon class="ml-auto sf-sidenav-toggle-icon">
        {{section.toggleIcon || 'arrow_drop_up'}}
      </mat-icon>
    </button>
    <ul
      [id]="'sidenav' + (section.name | async | noSpaces)"
      class="nav sf-nav-list collapse sf-sidenav-toggle-list"
      [ngClass]="{ 'show': !(collapsed | async) }">
      <li class="nav-item" *ngFor="let page of section.pages">

        <sf-sidenav-link
          [section]="page"
          *ngIf="page.type === 'link' && !(page.isHidden | async)">
        </sf-sidenav-link>
        <sf-sidenav-function-link
          [section]="page"
          *ngIf="page.type === 'function' && !(page.isHidden | async)">
        </sf-sidenav-function-link>

      </li>
    </ul>
  `
})
export class SidenavToggleLinkComponent implements OnInit, OnDestroy {
  @Input() section: SidenavSection;

  collapsed: Observable<boolean>;

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
        this.collapsed = this.setCollapsed(status);
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
   * Compares the current route, route parent, and the forced highlight to the sidenav section and
   * it's pages in order to see if the section is collapsed.
   * @param {SidenavStateModel} status
   * @returns {Observable<boolean>}
   */
  setCollapsed(status: SidenavStateModel): Observable<boolean> {
    const tasks: Observable<string>[] = [];

    const sectionName = <Observable<string>>this.section.name;
    tasks.push(sectionName.map((name: string) => name.toLowerCase().replace(' ', '')));

    this.section.pages.forEach((page: SidenavSection) => {
      const pageName = <Observable<string>>page.name;
      tasks.push(pageName.map((name: string) => name.toLowerCase().replace(' ', '')));
    });

    return combineLatest(tasks).pipe(
      map((results: string[]) => {
        const parentRouteName = status.parentRouteName
          ? status.parentRouteName.toLowerCase().replace(' ', '')
          : null;
        const routeName = status.routeName ? status.routeName.toLowerCase().replace(' ', '') : null;
        const forcedHighlight = status.forcedHighlight
          ? status.forcedHighlight.toLowerCase().replace(' ', '')
          : null;

        return !(
          results.includes(parentRouteName) ||
          results.includes(routeName) ||
          results.includes(forcedHighlight)
        );
      })
    );
  }
}
