import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import { lastValueFrom } from 'rxjs';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/pagination/dto';

@Injectable()
export class GoogleBookService {
  private _apiKey: string;

  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly httpService: HttpService,
  ) {
    this._apiKey = this.config.GOOGLE_BOOKS_API_KEY;
  }

  public async fetchBooks(
    bookName: string,
    pagination?: PageOptionsDto,
  ): Promise<PageDto<any>> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=${this._apiKey}`;

    const response = await lastValueFrom(
      this.httpService.get(url, { withCredentials: true }),
    );
    const books = response.data || [];
    const booksCount: number = books.length || 0;

    const pageDto = new PageMetaDto({
      pageOptionsDto: pagination,
      itemCount: booksCount,
    });

    return new PageDto(response.data, pageDto);
  }
}
