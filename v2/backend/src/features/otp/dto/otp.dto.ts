import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly otpCode: string;
}
