import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Req,
  Res,
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
import { GoogleGuard } from 'src/common/guards/google.guard';
import { Response } from 'express';

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
  public async login(@Body() loginDto: LoginDto): Promise<void> {
    return this.commandBus.execute(new LoginUserCommand(loginDto));
  }

  @Get('google')
  @Message('Sucessfully logged in with google.')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleGuard)
  public loginWithGoogle(): void {}

  @Get('login/google/callback')
  @Message('Sucessfully logged in with google.')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleGuard)
  public async googleCallback(@Res() response: Response): Promise<void> {
    response.redirect('http://localhost:3001/user/me');
  }

  @Post('register')
  @Message('Sucessfully registered.')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerDto: RegisterDto): Promise<UserDocument> {
    return this.commandBus.execute(new RegisterUserCommand(registerDto));
  }

  @Post('verify-account')
  @Message('Sucessfully verified the otp.')
  @HttpCode(HttpStatus.OK)
  public async verifyOtp(@Body() otpDto: OtpDto): Promise<OtpDocument> {
    return this.commandBus.execute(new VerifyAccountCommand(otpDto));
  }

  @Get('fetch-user')
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  public async getByUsername(@Query('id') id: string): Promise<UserDocument> {
    return this.queryBus.execute(new FetchUserCommand(id));
  }
}
