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
import { Message, User } from 'src/common/decorators';
import { UserDocument } from 'src/features/user/schemas';
import { LocalAuthGuard } from 'src/common/guards';
import { LoginUserCommand, RegisterUserCommand } from '../cqrs';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly commandbus: CommandBus) {}

  @Post('login')
  @Message('Sucessfully logged in.')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async login(@Body() loginDto: LoginDto) {
    return this.commandbus.execute(new LoginUserCommand(loginDto));
  }

  @Post('register')
  @Message('Sucessfully registered.')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerDto: RegisterDto) {
    return this.commandbus.execute(new RegisterUserCommand(registerDto));
  }

  @Get('me')
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async getme(@User() user: UserDocument) {
    return user;
  }
}
