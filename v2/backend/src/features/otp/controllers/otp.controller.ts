import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OtpDto, SendOtpDto } from '../dto/';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateOtpCommand } from '../cqrs/generate-otp/command/generate-otp.command';
import { VerifyAccountCommand } from 'src/features/auth/cqrs/verify-account/command/verify-account.command';
import { OtpDocument } from '../schemas';
import { Message } from 'src/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('otp')
export class OtpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send-otp')
  @Message('Otp sucessfully sent.')
  @HttpCode(HttpStatus.OK)
  public async sendOtp(@Body() otpDto: SendOtpDto): Promise<void> {
    await this.commandBus.execute(new GenerateOtpCommand(otpDto.email));
  }

  @Post('verify-account')
  @Message('Sucessfully verified the otp.')
  @HttpCode(HttpStatus.OK)
  public async verifyOtp(@Body() otpDto: OtpDto): Promise<OtpDocument> {
    return this.commandBus.execute(new VerifyAccountCommand(otpDto));
  }
}
