import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  public newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  public otpCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
