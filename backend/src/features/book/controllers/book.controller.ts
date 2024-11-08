import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { AuthenticatedGuard } from 'src/common/guards';
import { PageOptionsDto } from 'src/common/pagination/dto';
import { SearchBookCommand } from '../search-book/search-book.command';

@Controller('books')
@ApiTags('books')
@UseGuards(AuthenticatedGuard)
export class BookController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('search/:param')
  @Message('Sucessfully fetched books.')
  @HttpCode(HttpStatus.OK)
  public async searchBook(
    @Param('param') param: string,
    @Query() pagination: PageOptionsDto,
  ) {
    return this.queryBus.execute(new SearchBookCommand(param, pagination));
  }
}
