import { PaginationParams } from '../pagination/pagination-params.model';

export interface ApiParams extends PaginationParams {
  [param: string]: string[] | string;
}
