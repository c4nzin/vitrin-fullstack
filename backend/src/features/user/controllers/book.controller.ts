import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { BookRepository } from '../repositories';
import { CreateBookDto } from '../dto';
import { AuthenticatedGuard } from 'src/common/guards';

@Controller('books')
// @UseGuards(AuthenticatedGuard)
export class BooksController {
  constructor(private readonly bookRepository: BookRepository) {}

  @Get('search/:query')
  async searchBooks(@Param('query') query: string) {
    const books = await this.bookRepository.searchBooks(query);
    return books;
  }

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookRepository.createBookFromGoogle(createBookDto.title);
    return book;
  }
}
