import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchBookQuery } from './search-book.query';
import { PageDto } from 'src/common/pagination/dto';
import { GoogleBookService } from '../services/google-book.service';

@QueryHandler(SearchBookQuery)
export class SearchBookQueryHandler implements IQueryHandler<SearchBookQuery> {
  constructor(private readonly googleBookService: GoogleBookService) {}

  public async execute(query: SearchBookQuery): Promise<PageDto<any>> {
    const { param, pagination } = query;

    return this.googleBookService.fetchBooks(param, pagination);
  }
}
