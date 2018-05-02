import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableColumn } from '../table-column.model';
import { TableButtonClickOptions } from './table-button-column.model';

@Component({
  selector: 'sf-table-button-column',
  template: `
    <button
      class="btn m-0"
      [ngClass]="'btn-' + column.button.color(entity)"
      (click)="$event.stopPropagation(); buttonClick.emit({ column: column, entity: entity })"
      [disabled]="column.isDisabled(entity, specialEntity)"
      [ngbTooltip]="column.tooltip(entity)"
      placement="bottom"
      container="body"
      *ngIf="column.type === 'button' && column.button.type === 'default'">
      {{column.button.text(entity)}}
      <mat-icon *ngIf="column.button.icon">{{column.button.icon(entity)}}</mat-icon>
    </button>

    <button
      class="btn btn-raised m-0"
      [ngClass]="['btn-' + column.button.color(entity), column.button.class]"
      (click)="$event.stopPropagation(); buttonClick.emit({ column: column, entity: entity })"
      [disabled]="column.isDisabled(entity, specialEntity)"
      [ngbTooltip]="column.tooltip(entity)"
      placement="bottom"
      container="body"
      *ngIf="column.type === 'button' && column.button.type === 'raised'">
      {{column.button.text(entity)}}
      <mat-icon *ngIf="column.button.icon">{{column.button.icon(entity)}}</mat-icon>
    </button>

    <button
      class="btn btn-icon m-0"
      [ngClass]="'btn-' + column.button.color(entity)"
      (click)="$event.stopPropagation(); buttonClick.emit({ column: column, entity: entity })"
      [disabled]="column.isDisabled(entity, specialEntity)"
      [ngbTooltip]="column.tooltip(entity)"
      placement="bottom"
      container="body"
      *ngIf="column.type === 'button' && column.button.type === 'icon'">
      <mat-icon>{{column.button.icon(entity)}}</mat-icon>
    </button>
  `
})
export class TableButtonColumnComponent {
  @Input() column: TableColumn;
  @Input() entity: any;
  @Input() specialEntity: any;
  @Output() buttonClick = new EventEmitter<TableButtonClickOptions>();
}
