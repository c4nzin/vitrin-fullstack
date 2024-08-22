import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { User } from 'src/common/decorators';
import { UserDocument } from 'src/features/user/schemas';
import { LocalAuthGuard } from 'src/common/guards';
import { LoginUserCommand, RegisterUserCommand } from '../cqrs';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandbus: CommandBus) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@Body() loginDto: LoginDto) {
    return this.commandbus.execute(new LoginUserCommand(loginDto));
  }

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    return this.commandbus.execute(new RegisterUserCommand(registerDto));
  }

  @Get('me')
  @UseGuards(LocalAuthGuard)
  public async getme(@User() user: UserDocument) {
    return user;
  }
}
