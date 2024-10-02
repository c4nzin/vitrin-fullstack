import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  public authors: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public categories: string[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public pageCount: number;

  @ApiProperty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsString()
  public bookId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public publisher: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  public publishedDate: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public averageRating: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public ratingsCount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public smallThumbnail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public mediumThumbnail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public largeThumbnail: string;

  @ApiProperty()
  @IsString()
  public thumbnail: string;
}
