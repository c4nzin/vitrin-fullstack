import { ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from '../command/verify-otp.command';
import { OtpRepository } from 'src/features/otp/repositories';
export declare class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
    private readonly otpRepository;
    constructor(otpRepository: OtpRepository);
    execute(command: VerifyOtpCommand): Promise<boolean>;
    private validateOtp;
    private verifyOtp;
}
