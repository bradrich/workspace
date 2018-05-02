import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableColumn } from '../table-column.model';
import { TableMenuClickOptions } from './table-menu-column.model';

@Component({
  selector: 'sf-table-menu-column',
  template: `
    <div ngbDropdown #actionMenu="ngbDropdown" placement="bottom-right">
      <button
        [id]="column.header.toLowerCase() + 'MenuButton'"
        class="btn btn-icon btn-dark"
        ngbDropdownToggle
        [ngbTooltip]="column.header"
        placement="bottom"
        container="body"
        (click)="$event.stopPropagation()"
        [disabled]="column.isDisabled(entity, specialEntity)">
        <mat-icon>{{column.menu.icon}}</mat-icon>
      </button>
      <div ngbDropdownMenu [attr.aria-labelledby]="column.header.toLowerCase() + 'MenuButton'">
        <div *ngFor="let item of column.menu.items">
          <button
            class="dropdown-item"
            (click)="$event.stopPropagation(); actionMenu.close(); menuClick.emit({ menuItem: item, entity: entity })"
            *ngIf="item.type === 'button'">
            <mat-icon class="mr-2">{{item.icon}}</mat-icon>
            {{item.text}}
          </button>
          <div class="dropdown-item" *ngIf="item.type === 'text'">
            {{entity[item.text]}}
          </div>
        </div>
      </div>
    </div>
  `
})
export class TableMenuColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
  @Input() specialEntity: any;
  @Output() menuClick = new EventEmitter<TableMenuClickOptions>();
}
