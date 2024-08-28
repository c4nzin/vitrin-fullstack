import { OtpDto, SendOtpDto } from '../dto/';
import { CommandBus } from '@nestjs/cqrs';
import { OtpDocument } from '../schemas';
export declare class OtpController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    sendOtp(otpDto: SendOtpDto): Promise<void>;
    verifyOtp(otpDto: OtpDto): Promise<OtpDocument>;
}
