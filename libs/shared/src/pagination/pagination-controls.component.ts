import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  paginationAlign,
  paginationBoundaryLinks,
  paginationDirectionLinks,
  paginationEllipses,
  paginationItemsPerPage,
  paginationMaxSize,
  paginationRotate,
  paginationSize,
  paginationType
} from './pagination.constants';

@Component({
  selector: 'sf-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationControlsComponent implements OnChanges {
  @Input() type = paginationType;
  @Input() size = paginationSize;
  @Input() maxSize = paginationMaxSize;
  @Input() itemsPerPage = paginationItemsPerPage;
  @Input() totalItems: number;
  @Input() page: number;

  @Input()
  get align(): boolean {
    return this._align;
  }
  set align(v) {
    this._align = coerceBooleanProperty(v);
  }

  @Input()
  get boundaryLinks(): boolean {
    return this._boundaryLinks;
  }
  set boundaryLinks(v) {
    this._boundaryLinks = coerceBooleanProperty(v);
  }

  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(v) {
    this._directionLinks = coerceBooleanProperty(v);
  }

  @Input()
  get ellipses(): boolean {
    return this._ellipses;
  }
  set ellipses(v) {
    this._ellipses = coerceBooleanProperty(v);
  }

  @Input()
  get rotate(): boolean {
    return this._rotate;
  }
  set rotate(v) {
    this._rotate = coerceBooleanProperty(v);
  }

  @Output() pageChange = new EventEmitter<any>();

  pageCount = 0;
  pages: number[] = [];

  private _align = paginationAlign;
  private _boundaryLinks = paginationBoundaryLinks;
  private _directionLinks = paginationDirectionLinks;
  private _ellipses = paginationEllipses;
  private _rotate = paginationRotate;

  /**
   * OnChanges life-cycle method. Updates the pages.
   * @param {SimpleChangs} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updatePages(this.page);
  }

  /**
   * Determines if the page has a page prior to itself.
   * @returns {boolean}
   */
  hasPrevious(): boolean {
    return this.page > 1;
  }

  /**
   * Determines if the page has a page after itself.
   * @returns {boolean}
   */
  hasNext(): boolean {
    return this.page < this.pageCount;
  }

  /**
   * Updates the pages based on the newly selected page.
   * @param {number} pageNumber
   */
  selectPage(pageNumber: number) {
    this.updatePages(pageNumber);
  }

  /**
   * Determines if the page number is an ellipses.
   * @param {number} pageNumber
   * @returns {boolean}
   */
  isEllipsis(pageNumber: number): boolean {
    return pageNumber === -1;
  }

  /**
   * Appends ellipses and first/last page number to the displayed pages.
   * @param {number} start
   * @param {number} end
   */
  applyEllipses(start: number, end: number) {
    if (this.ellipses) {
      if (start > 0) {
        this.pages.unshift(-1);
        this.pages.unshift(1);
      }
      if (end < this.pageCount) {
        this.pages.push(-1);
        this.pages.push(this.pageCount);
      }
    }
  }

  /**
   * Rotates page numbers based on maxSize items visible. Currently selected page stays in the
   * middle.
   *
   * Example for selected page = 6:
   * [5, *6*, 7] for maxSize = 3
   * [4, 5, *6*, 7] for maxSize = 4
   * @returns {number[]}
   */
  applyRotation(): number[] {
    let start = 0;
    let end = this.pageCount;
    const leftOffset = Math.floor(this.maxSize / 2);
    const rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

    if (this.page <= leftOffset) {
      // Very beginning, no rotation -> [0..maxSize]
      end = this.maxSize;
    } else if (this.pageCount - this.page < leftOffset) {
      // Very end, no rotation -> [len-maxSize..len]
      start = this.pageCount - this.maxSize;
    } else {
      // Rotate
      start = this.page - leftOffset - 1;
      end = this.page + rightOffset;
    }

    return [start, end];
  }

  /**
   * Paginates page numbers based on maxSize items per page.
   * @returns {number[]}
   */
  applyPagination(): number[] {
    const page = Math.ceil(this.page / this.maxSize) - 1;
    const start = page * this.maxSize;
    const end = start + this.maxSize;

    return [start, end];
  }

  /**
   * Sets the page in the current pagination range. If the page is forced to change, the parent
   * components are notified.
   * @param {number} pageNumber
   */
  setPageInRange(pageNumber: number) {
    const prevPageNumber = this.page;
    this.page = this.getValueInRange(pageNumber, this.pageCount, 1);
    if (this.page !== prevPageNumber) {
      this.pageChange.emit(this.page);
    }
  }

  /**
   * Builds the pagination based on the configuration.
   * @param {number} pageNumber
   */
  updatePages(pageNumber: number) {
    this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    if (!this.isNumber(this.pageCount)) {
      this.pageCount = 0;
    }

    // Fill-in model needed to render pages.
    this.pages.length = 0;
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i);
    }

    // Set page within 1..maxSize.
    this.setPageInRange(pageNumber);

    // Apply maxSize if necessary.
    if (this.maxSize > 0 && this.pageCount > this.maxSize) {
      let start = 0;
      let end = this.pageCount;
      let a, b;

      // Either paginating or rotating page numbers.
      if (this.rotate) {
        a = this.applyRotation();
        start = a[0];
        end = a[1];
      } else {
        b = this.applyPagination();
        start = b[0];
        end = b[1];
      }
      this.pages = this.pages.slice(start, end);

      // Adding ellipses.
      this.applyEllipses(start, end);
    }
  }

  /**
   * Gets a value in range of two requested numbers.
   * @param {number} value
   * @param {number} max
   * @param {number} min
   * @returns {number}
   */
  getValueInRange(value: number, max: number, min: number): number {
    if (min === void 0) {
      min = 0;
    }
    return Math.max(Math.min(value, max), min);
  }

  /**
   * Determines if a value is a number.
   * @param {*} value
   * @returns {boolean}
   */
  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  /**
   * Converts a value to an integer.
   * @param {*} value
   * @returns {number}
   */
  toInteger(value: any): number {
    return parseInt('' + value, 10);
  }
}
