import { Pagination } from 'src/common/decorators/types/pagination.interface';

export class FetchTweetsCommand {
  constructor(
    public id: string,
    public pagination: Pagination,
  ) {}
}
