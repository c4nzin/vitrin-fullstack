import { OtpDto } from 'src/features/otp/dto';

export class VerifyAccountCommand {
  constructor(public otpDto: OtpDto) {}
}
