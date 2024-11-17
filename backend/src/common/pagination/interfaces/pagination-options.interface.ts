export interface PaginationOptions {
  limit?: number;
  page?: number;
  sort?: Record<string, 'asc' | 'desc'>;
}
