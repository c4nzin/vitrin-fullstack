import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
