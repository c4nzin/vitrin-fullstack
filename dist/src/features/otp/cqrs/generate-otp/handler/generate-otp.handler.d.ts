import { ICommandHandler } from '@nestjs/cqrs';
import { GenerateOtpCommand } from '../command/generate-otp.command';
import { OTP } from 'src/features/otp/schemas';
import { OtpRepository } from 'src/features/otp/repositories';
import { Config } from 'src/config/config';
export declare class GenerateOtpHandler implements ICommandHandler<GenerateOtpCommand> {
    private readonly otpRepository;
    private readonly config;
    constructor(otpRepository: OtpRepository, config: Config);
    execute(command: GenerateOtpCommand): Promise<any>;
    generateOtp(email: string): Promise<OTP>;
    createOtp(email: string): OTP;
}
