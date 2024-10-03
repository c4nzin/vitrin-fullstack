import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(300)
  public newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @MinLength(6)
  public otpCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
