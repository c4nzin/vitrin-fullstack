import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookController } from './controllers/book.controller';
import { allBooksHandler } from './all-books.handler';

@Module({
  imports: [CqrsModule],
  providers: [...allBooksHandler],
  controllers: [BookController],
  exports: [],
})
export class BookModule {}
