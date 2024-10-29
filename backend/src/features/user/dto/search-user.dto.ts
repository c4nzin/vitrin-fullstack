import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public query: string;
}
