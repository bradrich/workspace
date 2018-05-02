import { Component, Input } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-repeat-column',
  template: `
    <mat-chip-list class="sf-no-focus" multiple="true">
      <mat-chip
        *ngFor="let item of entity[column.model]"
        [color]="column.repeat.color(item)"
        selected="true">
        {{item[column.repeat.model] ? item[column.repeat.model] : item}}
      </mat-chip>
    </mat-chip-list>
    <span *ngIf="entity[column.model].length === 0">
      N/A
    </span>
  `
})
export class TableRepeatColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
}
