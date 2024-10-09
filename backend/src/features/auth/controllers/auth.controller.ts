import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Message } from 'src/common/decorators';
import { LocalAuthGuard } from 'src/common/guards';
import { ApiTags } from '@nestjs/swagger';
import { OtpDto } from 'src/features/otp/dto';
import { OtpDocument } from 'src/features/otp/schemas';
import { LoginUserCommand } from '../command/login-user.command';
import { RegisterUserCommand } from '../command/register-user.command';
import { VerifyAccountCommand } from '../command/verify-account.command';
import { UserDocument } from 'src/features/user/schemas';
import { FetchUserCommand } from '../command/fetch-user.command';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Post('fetch-user')
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  public async getByUsername(@Query('username') username: string): Promise<UserDocument> {
    return this.queryBus.execute(new FetchUserCommand(username));
  }
}
