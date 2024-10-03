import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { Message } from 'src/common/decorators';
import { LocalAuthGuard } from 'src/common/guards';
import { LoginUserCommand, RegisterUserCommand, VerifyAccountCommand } from '../cqrs';
import { ApiTags } from '@nestjs/swagger';
import { OtpDto } from 'src/features/otp/dto';
import { OtpDocument } from 'src/features/otp/schemas';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @Message('Sucessfully logged in.')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute(new LoginUserCommand(loginDto));
  }

  @Post('register')
  @Message('Sucessfully registered.')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerDto: RegisterDto) {
    return this.commandBus.execute(new RegisterUserCommand(registerDto));
  }

  @Post('verify-account')
  @Message('Sucessfully verified the otp.')
  @HttpCode(HttpStatus.OK)
  public async verifyOtp(@Body() otpDto: OtpDto): Promise<OtpDocument> {
    return this.commandBus.execute(new VerifyAccountCommand(otpDto));
  }
}
