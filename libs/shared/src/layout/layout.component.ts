import 'rxjs/add/operator/takeUntil';

import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { ConstantsHelper } from '../constants/constants.helper';
import { IConstants } from '../constants/constants.model';
import { sharedSelectors, SharedState } from '../reducers';
import { sm } from '../responsive/responsive.constants';
import { ResponsiveService } from '../responsive/responsive.service';
import { RouteData } from '../router/router.model';
import { RouterService } from '../router/router.service';
import { Sidenav } from '../sidenav/sidenav.model';
import { SidenavClose, SidenavOpen } from '../sidenav/state/sidenav.actions';
import { LayoutStateModel } from './layout-state.model';
import { layoutSidenavWidth } from './layout.constants';
import { LayoutStateChange } from './state/layout.actions';

@Component({
  selector: 'sf-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @Input() userPending: boolean;
  @Input() userAuthenticated: boolean;
  @Input() sidenavModel: Sidenav;
  @Input() siteDisplayName: string;

  appConstants: IConstants;
  isAuthRoute = true;
  sidenavMode: string;
  sidenavOpened: boolean;

  private onDestroy = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private store: Store<SharedState>,
    private responsiveService: ResponsiveService,
    private routerService: RouterService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.appConstants = ConstantsHelper.getConstants();

    this.watchNavigationEnd();
    this.watchBreakpoints();
    this.watchWindowResize();
    this.setSidenavOpened();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Watches the `Router` `NavigationEnd` event in order to set `isAuthRoute`.
   */
  watchNavigationEnd() {
    this.routerService
      .getRouteOnNavigationEnd()
      .map((route) => route.snapshot)
      .takeUntil(this.onDestroy)
      .subscribe((route) => {
        const routeData: RouteData = route.data;
        this.isAuthRoute = routeData.isAuthRoute;
      });
  }

  /**
   * Watches the `BreakpointObserver` in order to set the sidenav.
   */
  watchBreakpoints() {
    this.breakpointObserver
      .observe(`(max-width: ${sm.max}px)`)
      .takeUntil(this.onDestroy)
      .subscribe((result) => {
        // Set `sidenavMode` as well as closing or opening the sidenav.
        if (result.matches) {
          this.closeSidenav();
          this.sidenavMode = 'over';
        } else {
          this.openSidenav();
          this.sidenavMode = 'side';
        }
      });
  }

  /**
   * Watches the `window` size change event.
   */
  watchWindowResize() {
    this.responsiveService
      .getWindow()
      .filter((val) => val && val.innerWidth)
      .subscribe((val) => {
        // Set layout content widths.
        const contentWidth =
          this.sidenavMode === 'side' && this.sidenavOpened
            ? val.innerWidth - layoutSidenavWidth
            : val.innerWidth;
        const editWidth = Math.round(contentWidth * 0.26 + 58);
        const status: LayoutStateModel = {
          widths: {
            contentWidth: contentWidth - editWidth,
            editWidth: editWidth
          }
        };
        this.store.dispatch(new LayoutStateChange(status));
      });
  }

  /**
   * Sets `sidenavOpened`.
   */
  setSidenavOpened() {
    this.store
      .pipe(select(sharedSelectors.getSidenavOpened))
      .takeUntil(this.onDestroy)
      .subscribe((opened: boolean) => {
        this.sidenavOpened = opened;
      });
  }

  /**
   * Closes the sidenav by dispatching the event to the store.
   */
  closeSidenav() {
    this.store.dispatch(new SidenavClose());
  }

  /**
   * Opens the sidenav by dispatching the event to the store.
   */
  openSidenav() {
    this.store.dispatch(new SidenavOpen());
  }
}
