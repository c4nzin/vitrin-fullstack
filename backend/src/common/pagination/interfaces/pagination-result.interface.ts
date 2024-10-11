import { Pagination } from './pagination.interface';

export interface PaginationResult<T> extends Pagination {
  records: T;
}
