import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @Length(6.6)
  public readonly otpCode: string;
}
