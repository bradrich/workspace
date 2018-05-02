import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-link-column',
  template: `
    <span
      [ngClass]="'sf-' + column.link.color(entity)"
      (click)="$event.stopPropagation(); buttonClick.emit({ column: column, entity: entity })"
      [ngbTooltip]="column.tooltip(entity)"
      placement="bottom"
      container="body"
      style="text-decoration: underline">
      {{entity[column.model]}}
    </span>
  `
})
export class TableLinkColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
  @Output() buttonClick = new EventEmitter<any>();
}
