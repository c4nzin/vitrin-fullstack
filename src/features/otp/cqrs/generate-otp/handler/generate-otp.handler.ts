import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateOtpCommand } from '../command/generate-otp.command';
import { plainToInstance } from 'class-transformer';
import { OTP } from 'src/features/otp/schemas';
import { OtpRepository } from 'src/features/otp/repositories';
import otpGenerator from 'otp-generator';
import { Inject } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';

@CommandHandler(GenerateOtpCommand)
export class GenerateOtpHandler implements ICommandHandler<GenerateOtpCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly otpRepository: OtpRepository,
    @Inject(ENV) private readonly config: Config,
  ) {}

  public async execute(command: GenerateOtpCommand): Promise<any> {
    this.generateOtp(command.email);
    this.createOtp(command.email);
  }

  public async generateOtp(email: string): Promise<OTP> {
    const otp = this.createOtp(email);

    return this.otpRepository.create(otp);
  }

  public createOtp(email: string): OTP {
    const otpCode = otpGenerator.generate(this.config.OTP_LENGTH, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      digits: true,
      specialChars: false,
    });

    const otp = plainToInstance(OTP, { email, otpCode });

    return otp;
  }
}
