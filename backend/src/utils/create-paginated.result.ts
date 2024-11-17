import { PaginatedResult } from 'src/common/pagination/interfaces/paginated-result.interface';

export function createPaginatedResult<T>(
  records: T[],
  totalCount: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;

  return {
    items: records,
    total: totalCount,
    page,
    limit,
    totalPages,
    hasNextPage,
  };
}
