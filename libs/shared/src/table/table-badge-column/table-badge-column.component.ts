import { Component, Input } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-badge-column',
  template: `
    <span
      class="badge"
      [ngClass]="'badge-' + column.badge.color(entity)"
      *ngIf="column.type === 'badge'">
      {{column.badge.text(entity)}}
      <mat-icon *ngIf="column.badge.icon">{{column.badge.icon(entity)}}</mat-icon>
    </span>
  `
})
export class TableBadgeColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
  @Input() specialEntity: any;
}
