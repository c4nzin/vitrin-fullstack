import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from '../command/verify-otp.command';
import { OtpRepository } from 'src/features/otp/repositories';
import { BadRequestException } from '@nestjs/common';
import { OTP } from 'src/features/otp/schemas';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}

  public async execute(command: VerifyOtpCommand): Promise<boolean> {
    return this.validateOtp(command.email, command.otpCode);
  }

  public async validateOtp(email: string, otpCode: string): Promise<boolean> {
    const otp: OTP = await this.otpRepository.findOne({ otpCode });

    if (otp.otpCode !== otpCode) {
      throw new BadRequestException('Wrong otp code or email');
    }

    return true;
  }
}
