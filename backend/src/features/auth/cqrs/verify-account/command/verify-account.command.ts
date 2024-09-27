import { OtpDto } from 'src/features/otp/dto';

export class VerifyAccountCommand {
  constructor(public readonly otpDto: OtpDto) {}
}
