import { TableColumn } from '../table-column.model';

export interface TableButtonColumn {
  type?: 'default' | 'raised' | 'icon';
  icon?: (...args: any[]) => any;
  text?: (...args: any[]) => any;
  color?: (...args: any[]) => any;
  class?: string;
  action?: 'link' | 'setParameter' | 'setToDefault';
  link?: string;
  linkParams?: (...args: any[]) => any;
}

export interface TableButtonClickOptions {
  column: TableColumn;
  entity: any;
}
