import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @Length(6, 6)
  @ApiProperty()
  @IsString()
  public otpCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public newPassword: string;
}
