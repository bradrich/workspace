import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ConstantsHelper, IConstants } from '@swampfox/shared';

import { authSelectors, State as AuthState } from '../reducers';
import { Activate } from './state/activate.actions';

@Component({
  selector: 'sf-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  constants: IConstants;
  assets: any;

  keyMissing = false;
  pending$ = this.store.pipe(select(authSelectors.getActivatePending));
  success$ = this.store.pipe(select(authSelectors.getActivateSuccess));
  error$ = this.store.pipe(select(authSelectors.getActivateError));

  constructor(private route: ActivatedRoute, private store: Store<AuthState>) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.constants = ConstantsHelper.getConstants();

    this.assets = {
      swampfoxLogoAuth: require('../../assets/images/swampfox-logo-auth.png')
    };

    this.getKey();
  }

  /**
   * Gets the key from the `ActivatedRoute` `queryParams`.
   */
  getKey() {
    this.route.queryParams.first().subscribe((params) => {
      if (params['key']) {
        this.activateAccount(params['key']);
      } else {
        this.keyMissing = true;
      }
    });
  }

  /**
   * Activates the user account associated with the key.
   * @param {string} key
   */
  activateAccount(key: string) {
    this.store.dispatch(new Activate(key));
  }
}
