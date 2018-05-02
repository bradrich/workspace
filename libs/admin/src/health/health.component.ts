import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TableConfig } from '@swampfox/shared';

import { adminSelectors, AdminState } from '../reducers';
import { healthTableConfig } from './health.constants';
import { Health } from './health.model';
import { HealthGetAll, HealthSelect } from './state/health.actions';

@Component({
  selector: 'sf-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  health$ = this.adminStore.pipe(select(adminSelectors.getHealthHealth));
  pending$ = this.adminStore.pipe(select(adminSelectors.getHealthPending));
  error$ = this.adminStore.pipe(select(adminSelectors.getHealthError));
  selectedHealth$ = this.adminStore.pipe(select(adminSelectors.getHealthSelectedHealth));

  tableConfig: TableConfig;

  constructor(private adminStore: Store<AdminState>) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.tableConfig = healthTableConfig;
    this.getHealth();
  }

  /**
   * Dispatches an action to the store to get the health information.
   */
  getHealth() {
    this.adminStore.dispatch(new HealthGetAll());
  }

  /**
   * Dispatches the selected health to the store.
   * @param {Health[]} health
   */
  selectHealth(health: Health[]) {
    this.adminStore.dispatch(new HealthSelect(health));
  }
}
