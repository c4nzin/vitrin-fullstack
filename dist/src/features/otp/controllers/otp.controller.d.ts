import { OtpDto, SendOtpDto } from '../dto/';
import { CommandBus } from '@nestjs/cqrs';
export declare class OtpController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    sendOtp(otpDto: SendOtpDto): Promise<void>;
    verifyOtp(otpDto: OtpDto): Promise<void>;
}
