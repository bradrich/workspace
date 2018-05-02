interface TableMenuItem {
  type: 'button' | 'text';
  link?: string;
  paramName?: string;
  icon: string;
  text: string;
  action: string;
}

export interface TableMenuColumn {
  icon?: string;
  items: TableMenuItem[];
}

export interface TableMenuClickOptions {
  menuItem?: TableMenuItem;
  entity: any;
}
