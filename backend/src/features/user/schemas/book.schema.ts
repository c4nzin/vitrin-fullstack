import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({
  versionKey: false,
  collection: 'Book',
  timestamps: true,
})
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop({
    type: [String],
    required: true,
  })
  public authors: string[];

  @Prop({
    type: [String],
    required: false,
  })
  public categories: string[];

  @Prop({
    type: Number,
    required: false,
  })
  public pageCount: number;

  @Prop({
    type: String,
    required: true,
  })
  public description: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public bookId: string; // google book id....

  @Prop({
    type: String,
    required: false,
  })
  public publisher: string;

  @Prop({
    type: Date,
    required: false,
  })
  public publishedDate: Date;

  @Prop({
    type: Number,
    required: false,
  })
  public averageRating: number;

  @Prop({
    type: Number,
    required: false,
  })
  public ratingsCount: number;

  @Prop({
    type: String,
    required: false,
  })
  public thumbnail: string;

  @Prop({
    type: String,
    required: false,
  })
  public smallThumbnail: string;

  @Prop({
    type: String,
    required: false,
  })
  public mediumThumbnail: string;

  @Prop({
    type: String,
    required: false,
  })
  public largeThumbnail: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
