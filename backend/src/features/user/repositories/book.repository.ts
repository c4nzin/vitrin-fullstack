import { BaseRepository } from 'src/core/repositories/base.repository';
import { Book, BookDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import axios from 'axios';
import { CreateBookDto } from '../dto';

export class BookRepository extends BaseRepository<Book> {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @Inject(ENV) private readonly config: Config,
  ) {
    super(bookModel);
  }

  public async searchBooks(query: string) {
    const apiKey = this.config.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.items.map((item: any) => {
        const volumeInfo = item.volumeInfo;
        return {
          title: volumeInfo.title,
          authors: volumeInfo.authors || [],
          categories: volumeInfo.categories || [],
          pageCount: volumeInfo.pageCount,
          description: volumeInfo.description,
          bookId: item.id,
          publisher: volumeInfo.publisher,
          publishedDate: volumeInfo.publishedDate,
          averageRating: volumeInfo.averageRating,
          ratingsCount: volumeInfo.ratingsCount,
          thumbnail: volumeInfo.imageLinks?.thumbnail,
          smallThumbnail: volumeInfo.imageLinks?.smallThumbnail,
          mediumThumbnail: volumeInfo.imageLinks?.medium || '',
          largeThumbnail: volumeInfo.imageLinks?.large || '',
        };
      });
    } catch (error) {
      console.error('Error fetching data from Google Books API:', error);
      throw new Error('Failed to fetch books from Google Books API');
    }
  }

  public async createBookFromGoogle(query: string): Promise<BookDocument> {
    const books = await this.searchBooks(query);
    const bookData = books[0];

    const createBookDto: CreateBookDto = {
      title: bookData.title,
      authors: bookData.authors || [],
      categories: bookData.categories || [],
      pageCount: bookData.pageCount,
      description: bookData.description,
      bookId: bookData.bookId,
      publisher: bookData.publisher,
      publishedDate: bookData.publishedDate,
      averageRating: bookData.averageRating,
      ratingsCount: bookData.ratingsCount,
      thumbnail: bookData.thumbnail,
      smallThumbnail: bookData.smallThumbnail,
      mediumThumbnail: bookData.mediumThumbnail || '',
      largeThumbnail: bookData.largeThumbnail || '',
    };

    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }
}
