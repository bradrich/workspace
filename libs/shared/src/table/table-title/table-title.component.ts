import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-title',
  templateUrl: './table-title.component.html',
  styleUrls: ['./table-title.component.scss']
})
export class TableTitleComponent {
  @Input() title: string;
  @Input()
  get hideTitle(): boolean {
    return this._hideTitle;
  }
  set hideTitle(v) {
    this._hideTitle = coerceBooleanProperty(v);
  }
  get hideTitleExtras(): boolean {
    return this._hideTitleExtras;
  }
  set hideTitleExtras(v) {
    this._hideTitleExtras = coerceBooleanProperty(v);
  }

  @Input() entities: any[];
  @Input() specialEntity: any;
  @Input() totalItems: number;
  @Input() selectedCount: number;

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
  get showCreateEntity(): boolean {
    return this._showCreateEntity;
  }
  set showCreateEntity(v) {
    this._showCreateEntity = coerceBooleanProperty(v);
  }
  @Output() createEntity = new EventEmitter<any>();

  @Input() columns: TableColumn;

  private _hideTitle = false;
  private _hideTitleExtras = false;
  private _showTableOptions = false;
  private _showSearch = true;
  private _isSearching = false;
  private _showCreateEntity = false;
}
