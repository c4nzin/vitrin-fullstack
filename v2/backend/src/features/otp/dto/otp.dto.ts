import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public otpCode: string;
}
