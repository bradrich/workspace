import { TableColumn } from './table-column.model';

interface TableRowClick {
  action?: 'select';
}

export interface TableConfig {
  quickAdd?: boolean;
  rowClick?: TableRowClick;
  columns: TableColumn[];
}

export interface TableSortOptions {
  predicate?: string;
  reverse?: boolean;
}

export interface TableSelectOptions {
  entity?: any;
  deselectAllOtherEntities?: boolean;
}
