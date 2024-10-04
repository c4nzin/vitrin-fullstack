import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OtpRepository } from 'src/features/otp/repositories';
import { OTP } from 'src/features/otp/schemas';
import { BadRequestException } from '@nestjs/common';
import { VerifyOtpCommand } from '../command/verify-otp.command';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}

  public async execute(command: VerifyOtpCommand): Promise<boolean> {
    return this.validateOtp(command.email, command.otpCode);
  }

  public async validateOtp(email: string, otpCode: string): Promise<boolean> {
    const otp = await this.otpRepository.findOne({ otpCode });

    if (!otp) {
      throw new BadRequestException('Otp not found.');
    }

    const isValidOtp = this.verifyOtp(otp, otpCode, email);

    if (!isValidOtp) {
      throw new BadRequestException('Otps are not matching.');
    }

    return true;
  }

  public verifyOtp(otp: OTP, otpCode: string, email: string): boolean {
    return otp.otpCode === otpCode && otp.email === email; //as bool
  }
}
