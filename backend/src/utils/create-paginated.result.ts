import { PaginatedResult } from 'src/core/repositories/base.repository';

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
