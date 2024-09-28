import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @ApiProperty()
  @IsString()
  public otpCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public newPassword: string;
}
