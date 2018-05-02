import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { Account } from '../account/account.model';
import { AuthRole } from '../auth.constants';
import { authSelectors, State as AuthState } from '../reducers';

@Directive({
  selector: '[sfHasAuthority]'
})
export class HasAuthorityDirective {
  @Input()
  set sfHasAuthority(authorities: AuthRole[]) {
    this.watchAuthChanges(authorities);
  }

  private onDestroy = new Subject();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private store: Store<AuthState>
  ) {}

  /**
   * Watches the account's authentication changes to update the view.
   * @param {AuthRole[]} authorities
   */
  watchAuthChanges(authorities: AuthRole[]) {
    this.store
      .pipe(select(authSelectors.getAccount))
      .takeUntil(this.onDestroy)
      .subscribe((account: Account) => this.updateView(account, authorities));
  }

  /**
   * Updates the view by removing the template (not showing) if the account does not have the
   * required authentication authorities.
   * @param {Account} account
   * @param {AuthRole[]} authorities
   */
  updateView(account: Account, authorities: AuthRole[]) {
    if (account && _.intersection(account.authorities, authorities).length) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
