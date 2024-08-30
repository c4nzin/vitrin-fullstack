import { Pagination } from 'src/common/decorators/types/pagination.interface';

export class FetchFollowersCommand {
  constructor(
    public id: string,
    public pagination: Pagination,
  ) {}
}
