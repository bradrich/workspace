import { Component, Input } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-time-ago-column',
  template: `
    <span *ngIf="entity[column.model]">
      {{entity[column.model] | amTimeAgo}}<br />
      <small>
        on
        <strong>{{entity[column.model] | date:column.timeAgo.dateFilter}}</strong>
        <span *ngIf="column.timeAgo.byModel">
          by
          <strong>{{entity[column.timeAgo.byModel]}}</strong>
        </span>
      </small>
    </span>
    <span *ngIf="!entity[column.model]">N/A</span>
  `
})
export class TableTimeAgoColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
}
