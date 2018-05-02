import { Component, Input } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-text-column',
  template: `
    <span *ngIf="!column.textFilter">
      {{entity[column.model]}}
      <span
        class="mr-0"
        [ngClass]="[column.specialEntityLabel?.className]"
        *ngIf="column.specialEntityLabel?.show(entity, specialEntity)">
        {{column.specialEntityLabel.text}}
      </span>
    </span>
    <span *ngIf="column.textFilter && column.textFilter === 'encrypted'">
      {{entity[column.model] | encrypted:entity}}
    </span>
  `
})
export class TableTextColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
  @Input() specialEntity: any;
}
