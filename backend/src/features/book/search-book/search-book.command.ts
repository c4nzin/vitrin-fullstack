import { PageOptionsDto } from 'src/common/pagination/dto';

export class SearchBookCommand {
  constructor(
    public param: string,
    public pagination: PageOptionsDto,
  ) {}
}
