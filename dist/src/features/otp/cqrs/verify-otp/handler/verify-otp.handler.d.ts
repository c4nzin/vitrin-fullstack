import { ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from '../command/verify-otp.command';
import { OtpRepository } from 'src/features/otp/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { OTP } from 'src/features/otp/schemas';
export declare class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
    private readonly otpRepository;
    constructor(otpRepository: OtpRepository);
    execute(command: VerifyOtpCommand): Promise<void>;
    validateOtp(email: string, otpCode: string): Promise<void>;
    verifyOtp(user: UserDocument, otp: OTP | null, otpCode: string): void;
}
