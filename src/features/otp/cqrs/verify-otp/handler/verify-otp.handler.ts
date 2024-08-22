import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from '../command/verify-otp.command';
import { OtpRepository } from 'src/features/otp/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { OTP } from 'src/features/otp/schemas';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}

  public async execute(command: VerifyOtpCommand): Promise<void> {
    this.validateOtp(command.email, command.otpCode);
  }

  public async validateOtp(email: string, otpCode: string): Promise<void> {
    const user = await this.otpRepository.findUserWithEmail(email);
    const otp = await this.otpRepository.findOne({ otpCode });

    this.verifyOtp(user, otp, otpCode);

    await user.updateOne({ isEmailVerified: true });
  }

  public verifyOtp(user: UserDocument, otp: OTP | null, otpCode: string): void {
    if (!otp || !user || otp.otpCode !== otpCode) {
      throw new BadRequestException('Otp code or email wrong.');
    }
  }
}
