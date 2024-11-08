import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public bookName: string;
}
