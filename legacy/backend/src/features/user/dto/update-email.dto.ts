import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUserFieldUnique } from 'src/common/decorators';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  public otpCode: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserFieldUnique('email')
  public email: string;
}
