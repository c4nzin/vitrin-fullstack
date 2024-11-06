import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OtpDto, SendOtpDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateOtpCommand } from '../command/generate-otp.command';
import { Message } from 'src/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpCommand } from '../command/verify-otp.command';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('send')
  @Message('Otp sucessfully sent.')
  @HttpCode(HttpStatus.OK)
  public async sendOtp(@Body() otpDto: SendOtpDto): Promise<void> {
    await this.commandBus.execute(new GenerateOtpCommand(otpDto.email));
  }

  @Post('verify')
  @Message('Sucessfully verified the otp.')
  @HttpCode(HttpStatus.OK)
  public async verifyOtp(@Body() otpDto: OtpDto): Promise<void> {
    const { email, otpCode } = otpDto;

    await this.commandBus.execute(new VerifyOtpCommand(email, otpCode));
  }
}
