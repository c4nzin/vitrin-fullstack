import { PageOptionsDto } from 'src/common/pagination/dto';

export class SearchBookQuery {
  constructor(
    public param: string,
    public pagination: PageOptionsDto,
  ) {}
}
