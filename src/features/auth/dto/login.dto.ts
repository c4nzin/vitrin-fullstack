import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  public username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  public password: string;
}
