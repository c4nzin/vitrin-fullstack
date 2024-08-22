import { Body, Controller, Post } from '@nestjs/common';
import { OtpDto, SendOtpDto } from '../dto/';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateOtpCommand } from '../cqrs/generate-otp/command/generate-otp.command';
import { VerifyOtpCommand } from '../cqrs/verify-otp/command/verify-otp.command';

@Controller('auth')
export class OtpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('sendotp')
  public async sendOtp(@Body() otpDto: SendOtpDto): Promise<void> {
    await this.commandBus.execute(new GenerateOtpCommand(otpDto.email));
  }

  @Post('verifyOtp')
  public async verifyOtp(@Body() otpDto: OtpDto): Promise<void> {
    await this.commandBus.execute(new VerifyOtpCommand(otpDto.email, otpDto.otpCode));
  }
}
