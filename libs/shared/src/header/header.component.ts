import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { sharedSelectors, SharedState } from '../reducers';
import { HeaderStateModel } from './header-state.model';

@Component({
  selector: 'sf-header',
  template: `
    <span class="d-flex flex-row navbar-brand">

      <!-- App name -->
      <span class="d-none d-sm-flex sf-app-name" *ngIf="siteDisplayName">
        {{siteDisplayName}}
      </span>
      <!-- End app name -->

      <!-- Parent title -->
      <span class="d-none d-sm-flex flex-row align-items-center" *ngIf="parentRouteTitle">
        <mat-icon *ngIf="siteDisplayName">chevron_right</mat-icon>
        {{parentRouteTitle}}
      </span>
      <!-- End parent title -->

      <!-- Route title -->
      <span class="d-flex flex-row align-items-center" *ngIf="routeTitle">
        <mat-icon class="d-none d-sm-inline-block">chevron_right</mat-icon>
        {{routeTitle}}
      </span>
      <!-- End route title -->

    </span>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() siteDisplayName: string;

  parentRouteTitle: string;
  routeTitle: string;

  private onDestroy = new Subject();

  constructor(private store: Store<SharedState>) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.store
      .pipe(select(sharedSelectors.getHeaderStatus))
      .takeUntil(this.onDestroy)
      .subscribe((status: HeaderStateModel) => {
        this.parentRouteTitle = status.parentRouteTitle;
        this.routeTitle = status.routeTitle;
      });
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }
}
