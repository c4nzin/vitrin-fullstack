import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookController } from './controllers/book.controller';
import { allBooksHandler } from './all-books.handler';
import { GoogleBookService } from './services/google-book.service';

@Module({
  imports: [CqrsModule],
  providers: [GoogleBookService, ...allBooksHandler],
  controllers: [BookController],
  exports: [],
})
export class BookModule {}
