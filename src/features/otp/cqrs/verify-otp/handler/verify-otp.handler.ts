import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from '../command/verify-otp.command';
import { OtpRepository } from 'src/features/otp/repositories';
import { OTP } from 'src/features/otp/schemas';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}

  public async execute(command: VerifyOtpCommand): Promise<boolean> {
    return this.validateOtp(command.email, command.otpCode);
  }

  private async validateOtp(email: string, otpCode: string): Promise<boolean> {
    const otp = await this.otpRepository.findOne({ otpCode });
    return this.verifyOtp(otp, otpCode);
  }

  private verifyOtp(otp: OTP, otpCode: string): boolean {
    if (!otp || otp.otpCode !== otpCode) {
      return false;
    } else {
      return true;
    }
  }
}
