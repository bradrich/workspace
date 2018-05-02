import { Injector } from '@angular/core';
import { TableConfig } from '@swampfox/shared';
import * as _ from 'lodash';

import { Health } from './health.model';

export const healthTableConfig: TableConfig = {
  quickAdd: false,
  rowClick: {
    action: 'select'
  },
  columns: [
    {
      type: 'selection',
      show: true,
      showInViewOptions: false,
      header: 'Selected',
      isDisabled: () => false
    },
    {
      type: 'function',
      show: true,
      showInViewOptions: false,
      header: 'Service name',
      func: (injector: Injector, entity: Health) => _.startCase(entity.name),
      isSortable: false
    },
    {
      type: 'badge',
      show: true,
      showInViewOptions: false,
      header: 'Status',
      badge: {
        text: (entity: Health) => entity.status,
        color: (entity: Health) => (entity.status === 'UP' ? 'success' : 'danger')
      },
      isSortable: false
    }
  ]
};
