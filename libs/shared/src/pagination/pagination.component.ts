import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { paginationItemsPerPageOptions } from './pagination.constants';

@Component({
  selector: 'sf-pagination',
  template: `
    <div class="d-xs-none">Rows per page</div>

    <div class="d-xs-none ml-4">

      <div class="form-group m-0">
        <select
          class="form-control"
          [(ngModel)]="itemsPerPage"
          (ngModelChange)="transition.emit({ page: null, itemsPerPage: itemsPerPage })"
          attr.aria-label="Rows per page">
          <option *ngFor="let option of itemsPerPageOptions" [value]="option">
            {{option}}
          </option>
        </select>
      </div>

    </div>

    <div class="ml-4" *ngIf="totalItems > itemsPerPage">
      {{getRangeString()}}
    </div>

    <sf-pagination-controls
      class="ml-4"
      [type]="type"
      size="sm"
      [totalItems]="totalItems"
      [itemsPerPage]="itemsPerPage"
      [(page)]="page"
      (pageChange)="transition.emit({ page: page, itemsPerPage: itemsPerPage })"
      *ngIf="totalItems > itemsPerPage">
    </sf-pagination-controls>
  `,
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  @Input() type: string;
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() page: number;

  @Output() transition = new EventEmitter<any>();

  itemsPerPageOptions: number[] = paginationItemsPerPageOptions;

  /**
   * Builds the `1 - 10 of 20` line for displaying the page range and total number of items
   * available.
   * @returns {string}
   */
  getRangeString(): string {
    const pageStartItem: number =
      (this.page - 1) * this.itemsPerPage !== 0 ? (this.page - 1) * this.itemsPerPage + 1 : 1;
    const pageEndItem: number =
      this.page * this.itemsPerPage < this.totalItems
        ? this.page * this.itemsPerPage
        : this.totalItems;

    return `${pageStartItem.toString()} - ${pageEndItem.toString()} of ${this.totalItems}`;
  }
}
