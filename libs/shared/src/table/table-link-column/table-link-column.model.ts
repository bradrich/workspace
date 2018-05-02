export interface TableLinkColumn {
  route?: string;
  params?: (...args: any[]) => any;
  color?: (...args: any[]) => any;
}
