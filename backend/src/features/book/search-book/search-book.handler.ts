import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchBookCommand } from './search-book.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import axios from 'axios';
import { PageDto, PageMetaDto } from 'src/common/pagination/dto';

@QueryHandler(SearchBookCommand)
export class SearchBookQueryHandler implements IQueryHandler<SearchBookCommand> {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public async execute(query: SearchBookCommand): Promise<any> {
    const { param, pagination } = query;

    const apiKey = this.config.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${param}&key=${apiKey}`;

    try {
      const response = await axios.get(url, { withCredentials: true });
      const books = response.data || [];
      const booksCount: number = books.length;

      const pageDto = new PageMetaDto({
        pageOptionsDto: pagination,
        itemCount: booksCount,
      });

      return new PageDto(response.data, pageDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
