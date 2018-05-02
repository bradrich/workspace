import { TableBadgeColumn } from './table-badge-column/table-badge-column.model';
import { TableButtonColumn } from './table-button-column/table-button-column.model';
import { TableLinkColumn } from './table-link-column/table-link-column.model';
import { TableMenuColumn } from './table-menu-column/table-menu-column.model';
import { TableQuickAddFormOptions } from './table-quick-add-form/table-quick-add-form.model';
import { TableRepeatColumn } from './table-repeat-column/table-repeat-column.model';
import { TableTimeAgoColumn } from './table-time-ago-column/table-time-ago-column.model';

interface TableIconColumn {
  type?: (...args: any[]) => any;
  color?: (...args: any[]) => any;
}

interface TableSpecialEntityLabel {
  show?: (...args: any[]) => any;
  text?: string;
  className?: string;
}

export interface TableColumn {
  type:
    | 'audioPlayer'
    | 'badge'
    | 'button'
    | 'date'
    | 'function'
    | 'header'
    | 'icon'
    | 'link'
    | 'menu'
    | 'repeat'
    | 'selection'
    | 'text'
    | 'timeAgo';
  show?: boolean;
  showInViewOptions?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  cellWidth?: 'default' | 'shrinkToFit';
  header: string;
  hideHeader?: boolean;
  model?: string;
  badge?: TableBadgeColumn;
  button?: TableButtonColumn;
  icon?: TableIconColumn;
  link?: TableLinkColumn;
  textFilter?: 'encrypted';
  dateFormat?: string;
  wrapClass?: (...args: any[]) => any;
  func?: (...args: any[]) => any;
  specialEntityLabel?: TableSpecialEntityLabel;
  repeat?: TableRepeatColumn;
  timeAgo?: TableTimeAgoColumn;
  labelClass?: (...args: any[]) => any;
  menu?: TableMenuColumn;
  tooltip?: (...args: any[]) => any;
  isSortable?: boolean;
  isDisabled?: (...args: any[]) => any;
  quickAddFormOptions?: TableQuickAddFormOptions;
}
