import { Pagination } from 'src/common/decorators/types/pagination.interface';
import { PageOptionsDto } from 'src/common/pagination/dto/page-options.dto';

export class FetchTweetsCommand {
  constructor(
    public id: string,
    public pagination: Pagination,
  ) {}
}
