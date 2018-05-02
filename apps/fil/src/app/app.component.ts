import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccountGet, authSelectors, AuthState, PasswordResetForceService } from '@swampfox/auth';
import {
  ConstantsHelper,
  HeaderStateChange,
  HeaderStateModel,
  IConstants,
  PageTitleService,
  RouteData,
  RouterService,
  SharedState,
  Sidenav,
  SidenavStateChange,
  SidenavStateModel
} from '@swampfox/shared';
import { Subject } from 'rxjs/Subject';

import { SidenavService } from './layout/sidenav/sidenav.service';

@Component({
  selector: 'fil-root',
  template: `
    <sf-layout
      [userPending]="userPending$ | async"
      [userAuthenticated]="userAuthenticated$ | async"
      [sidenavModel]="sidenavModel"
      [siteDisplayName]="appConstants.appCustomerName">
      <router-outlet></router-outlet>
    </sf-layout>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  userPending$ = this.authStore.pipe(select(authSelectors.getAccountPending));
  userAuthenticated$ = this.authStore.pipe(select(authSelectors.getAccountLoggedIn));
  sidenavModel: Sidenav;
  appConstants: IConstants;

  private onDestroy = new Subject();

  constructor(
    private authStore: Store<AuthState>,
    private passwordResetForceService: PasswordResetForceService,
    private sharedStore: Store<SharedState>,
    private pageTitleService: PageTitleService,
    private routerService: RouterService,
    private sidenavService: SidenavService
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.authStore.dispatch(new AccountGet());
    this.sidenavModel = this.sidenavService.sidenav;
    this.appConstants = ConstantsHelper.getConstants();
    this.watchNavigationEnd();
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Watches the `Router` `NavigationEnd` event in order to initialize the application.
   */
  watchNavigationEnd() {
    this.routerService
      .getRouteOnNavigationEnd()
      .map((route) => route.snapshot)
      .takeUntil(this.onDestroy)
      .subscribe((route) => {
        const routeData: RouteData = route.data;
        const parentRouteData: RouteData = route.parent.data;

        // Set the page title.
        this.pageTitleService.title = routeData.title;

        // Determine if the application needs to be locked for force account password reset.
        this.authStore
          .pipe(select(authSelectors.getPasswordResetForceForcing))
          .first()
          .subscribe((forcing: boolean) => {
            if (!routeData.isAuthRoute && routeData.name !== 'accountSecurity' && forcing) {
              this.passwordResetForceService.force();
            }
          });

        // Update `HeaderState`.
        const headerState: HeaderStateModel = {
          parentRouteTitle: parentRouteData.title,
          routeTitle: routeData.title
        };
        this.sharedStore.dispatch(new HeaderStateChange(headerState));

        // Update `SidenavState`.
        const sidenavState: SidenavStateModel = {
          parentRouteName: parentRouteData.name,
          routeName: routeData.name,
          forcedHighlight: routeData.sidenavHighlight
        };
        this.sharedStore.dispatch(new SidenavStateChange(sidenavState));
      });
  }
}
