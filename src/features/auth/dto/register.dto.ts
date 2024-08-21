import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender } from 'src/features/user/schemas';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  public username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  public password: string;

  @IsEnum(Gender)
  public gender: Gender = Gender.NOT_KNOWN;
}
