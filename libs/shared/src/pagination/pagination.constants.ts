export const paginationAlign = false;
export const paginationBoundaryLinks = true;
export const paginationDirectionLinks = true;
export const paginationEllipses = true;
export const paginationItemsPerPage = 10;
export const paginationItemsPerPageOptions = [5, 10, 20, 50, 100];
export const paginationMaxSize = 5;
export const paginationRotate = false;
export const paginationSize = 'md';
export const paginationType = 'slim';

export interface PagingOptions {
  page?: number;
  itemsPerPage?: number;
}
