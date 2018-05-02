import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-head-row',
  templateUrl: './table-head-row.component.html',
  styleUrls: ['./table-head-row.component.scss']
})
export class TableHeadRowComponent implements OnInit {
  @Input() columns: TableColumn;
  @Input() predicate: string;
  @Input()
  get reverse(): boolean {
    return this._reverse;
  }
  set reverse(v) {
    this._reverse = coerceBooleanProperty(v);
  }

  @Output() sort = new EventEmitter<any>();

  @Input() selectionModel: SelectionModel<any>;
  @Input()
  get areAllEntitiesSelected(): boolean {
    return this._areAllEntitiesSelected;
  }
  set areAllEntitiesSelected(v) {
    this._areAllEntitiesSelected = coerceBooleanProperty(v);
  }
  @Output() selectEntities = new EventEmitter<any>();

  private _reverse = true;
  private _areAllEntitiesSelected = false;

  constructor() {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {}

  /**
   * Gets the column's class based on the type of column.
   * @param {TableColumn} column
   * @returns {string[]}
   */
  getColumnClass(column: TableColumn): string[] {
    const classes = [];

    if (column) {
      if (column.type === 'selection') {
        classes.push('sf-checkbox-column');
      } else if (
        column.type === 'icon' ||
        column.type === 'menu' ||
        column.type === 'audioPlayer' ||
        (column.type === 'button' && column.button.type === 'icon')
      ) {
        classes.push('sf-icon-column');
      }

      if (this.getSortBy(column)) {
        classes.push('sf-sort-by');
        if (!this.reverse) {
          classes.push('sf-reverse');
        }
      }

      if (column.textAlign === 'center') {
        classes.push('text-center');
      } else if (column.textAlign === 'right') {
        classes.push('text-right');
      }

      if (column.cellWidth === 'shrinkToFit') {
        classes.push('sf-shrink');
      }
    }

    return classes;
  }

  /**
   * Checks if the column is allowed to be sorted, which is a parameter that is set within the
   * column's definition in the `config`. If it is capable of being sorted, it returns the column's
   * model. If not, it returns false.
   * @param {TableColumn} column
   * @returns {(boolean | string)}
   */
  getSortBy(column: TableColumn): boolean | string {
    return column.isSortable ? column.model : false;
  }

  /**
   * Determines whether or not to show the column header.
   * @param {TableColumn} column
   * @returns {boolean}
   */
  getShowColumnHeader(column: TableColumn): boolean {
    return (
      column &&
      'selection' !== column.type &&
      'icon' !== column.type &&
      'menu' !== column.type &&
      'audioPlayer' !== column.type &&
      !(column.button && column.button.type === 'icon') &&
      !column.hideHeader
    );
  }
}
