import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { TableButtonClickOptions } from './table-button-column/table-button-column.model';
import { TableColumn } from './table-column.model';
import { TableMenuClickOptions } from './table-menu-column/table-menu-column.model';
import { TableConfig, TableSelectOptions } from './table.model';

@Component({
  selector: 'sf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges {
  @Input() config: TableConfig;

  @Input() title: string;
  @Input()
  get hideTitle(): boolean {
    return this._hideTitle;
  }
  set hideTitle(v) {
    this._hideTitle = coerceBooleanProperty(v);
  }
  @Input()
  get hideTitleExtras(): boolean {
    return this._hideTitleExtras;
  }
  set hideTitleExtras(v) {
    this._hideTitleExtras = coerceBooleanProperty(v);
  }

  @Input()
  get showTableOptions(): boolean {
    return this._showTableOptions;
  }
  set showTableOptions(v) {
    this._showTableOptions = coerceBooleanProperty(v);
  }

  // TODO: Figure out new search not based on ElasticSearch.
  // @Input()
  // get showSearch(): boolean { return this._showSearch; }
  // set showSearch(v) { this._showSearch = coerceBooleanProperty(v); }
  // @Input()
  // get isSearching(): boolean { return this._isSearching; }
  // set isSearching(v) { this._isSearching = coerceBooleanProperty(v); }
  // @Input() searchOptions: ISearchOption[];
  // @Input() searchOptionsLabel: string;
  // @Input() currentSearchOption: string;
  // @Input() searchClass: string;
  // @Output() search = new EventEmitter<any>();
  // @Output() searchReset = new EventEmitter<any>();

  @Input()
  get showDeleteEntities(): boolean {
    return this._showDeleteEntities;
  }
  set showDeleteEntities(v) {
    this._showDeleteEntities = coerceBooleanProperty(v);
  }
  @Output() deleteEntities = new EventEmitter<any>();

  @Input()
  get showCreateEntity(): boolean {
    return this._showCreateEntity;
  }
  set showCreateEntity(v) {
    this._showCreateEntity = coerceBooleanProperty(v);
  }
  @Output() createEntity = new EventEmitter<any>();

  @Input() entities: any[];
  @Input() specialEntity: any;

  @Input()
  get totalItems(): number {
    return this._totalItems;
  }
  set totalItems(v) {
    this._totalItems = coerceNumberProperty(v);
  }
  @Input() predicate: string;
  @Input() specialPredicate: string;
  @Input()
  get reverse(): boolean {
    return this._reverse;
  }
  set reverse(v) {
    this._reverse = coerceBooleanProperty(v);
  }
  @Output() sort = new EventEmitter<any>();

  @Input() quickAddModel: any;
  @Input()
  get isQuickAddSaving(): boolean {
    return this._isQuickAddSaving;
  }
  set isQuickAddSaving(v) {
    this._isQuickAddSaving = coerceBooleanProperty(v);
  }
  @Output() quickAddSave = new EventEmitter<any>();

  @Input() selectedEntities: any[];
  @Output() selectEntities = new EventEmitter<any>();

  @Input()
  get isMultiEditAllowed(): boolean {
    return this._isMultiEditAllowed;
  }
  set isMultiEditAllowed(v) {
    this._isMultiEditAllowed = coerceBooleanProperty(v);
  }

  @Output() buttonClick = new EventEmitter<TableButtonClickOptions>();
  @Output() actionMenuClick = new EventEmitter<TableMenuClickOptions>();

  orderBy: string;
  selectionModel: SelectionModel<any>;

  private _hideTitle = false;
  private _hideTitleExtras = false;
  private _showTableOptions = false;
  private _showSearch = true;
  private _isSearching = false;
  private _showDeleteEntities = false;
  private _showCreateEntity = false;
  private _totalItems: number;
  private _reverse = true;
  private _isQuickAddSaving = false;
  private _isMultiEditAllowed = true;

  constructor(public injector: Injector, private router: Router) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setOrderBy();
  }

  /**
   * OnChanges life-cycle method.
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'selectedEntities' && changes[key]) {
        this.selectionModel = new SelectionModel<any>(
          this.isMultiEditAllowed,
          this.selectedEntities
        );
      }
    }
  }

  /**
   * Sets `orderBy` based on a requested `specialPredicate`.
   */
  setOrderBy() {
    if (this.specialPredicate) {
      this.orderBy = `-${this.specialPredicate}`;
    }
  }

  /**
   * Sorts the table bsed off of the predicate requested, which is the column's model. Emits the
   * `sort` output binding.
   * @param {string} predicate Column's model passed in from the `TableHeadComponent`.
   */
  handleSort(predicate: string) {
    this.sort.emit({
      predicate: predicate,
      reverse: predicate !== this.predicate ? true : !this.reverse
    });
  }

  /**
   * Sets the `ngFor` `trackBy` functionality.
   * @param {number} index
   * @param {*} item
   * @returns {number}
   */
  setTrackBy(index: number, item: any): number {
    return item.id;
  }

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
   * Handles the row click event. Gets its definition from the `config` `TableConfig` object.
   * @param {*} entity
   * @returns {void}
   */
  rowClick(entity: any): void {
    if (!this.config.rowClick || !this.config.rowClick.action) {
      return;
    }

    if (this.config.rowClick.action === 'select') {
      this.handleEntitySelection({
        entity: entity,
        deselectAllOtherEntities: true
      });
    }
  }

  /**
   * Selects one or all entities, unless selection of the entity is disabled.
   * @param {TableSelectOptions} options Contains the following:
   *   {*} [entity]
   *   {boolean} [deselectAllOtherEntities]
   */
  handleEntitySelection(options: TableSelectOptions) {
    // If there is an entity being requested, is it currently selected?
    const entitySelected = options.entity && this.selectionModel.isSelected(options.entity);

    // If reqeusted to deselect all other entities or if `MultiEdit` is not allowed and deselect is
    // necessary, do that before selecting the newer entities. However, do not perform any action on
    // the main entity requested.
    if (options.deselectAllOtherEntities || !this.isMultiEditAllowed) {
      this.selectionModel.clear();
    }

    // If no entity has been requested, then select all of them.
    const isDisabled = this.getIsEntitySelectionDisabled();
    if (!options.entity && !this.areAllEntitiesSelected()) {
      this.entities.forEach((e: any) => {
        if (!isDisabled(e, this.specialEntity)) {
          this.selectionModel.select(e);
        }
      });
    } else if (!options.entity) {
      this.selectionModel.clear();
    } else if (!isDisabled(options.entity, this.specialEntity)) {
      entitySelected
        ? this.selectionModel.deselect(options.entity)
        : this.selectionModel.select(options.entity);
    }

    // Emit `selectEntities` event.
    this.selectEntities.emit(this.selectionModel.selected);
  }

  /**
   * Looks through the `config` object to find the `isDisabled` function of the `selection` column,
   * or, if there isn't a function defined, defines one that results in `false`.
   * @returns {(...args: any[]) => any}
   */
  getIsEntitySelectionDisabled(): (...args: any[]) => any {
    const defaultDisabled = (e, se) => false;

    let disabled;
    this.config.columns.forEach((column: TableColumn) => {
      if (column.type === 'selection' && column.isDisabled !== undefined) {
        disabled = column.isDisabled;
      }
    });

    return disabled || defaultDisabled;
  }

  /**
   * Determines if all entities that are selectable, meaning that their selection is not disabled,
   * are selected.
   * @returns {boolean}
   */
  areAllEntitiesSelected(): boolean {
    let disabledCount = 0;

    const isDisabled = this.getIsEntitySelectionDisabled();
    this.entities.forEach((entity: any) => {
      if (isDisabled(entity, this.specialEntity)) {
        disabledCount += 1;
      }
    });

    const selectableCount = this.entities.length - disabledCount;

    return this.selectionModel.selected.length === selectableCount;
  }
}
