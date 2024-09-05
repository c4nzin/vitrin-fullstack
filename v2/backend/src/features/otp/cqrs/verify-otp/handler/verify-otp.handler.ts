import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from '../command/verify-otp.command';
import { OtpRepository } from 'src/features/otp/repositories';
import { OTP } from 'src/features/otp/schemas';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}

  public async execute(command: VerifyOtpCommand): Promise<boolean> {
    return this.validateOtp(command.email, command.otpCode);
  }

  public async validateOtp(email: string, otpCode: string): Promise<boolean> {
    const otp = await this.otpRepository.findOne({ otpCode });

    if (!otp) {
      throw new BadRequestException('Otps are not matcing.');
    }

    return this.verifyOtp(otp, otpCode);
  }

  public verifyOtp(otp: OTP, otpCode: string): boolean {
    return otp.otpCode === otpCode; //as bool
  }
}
