import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { LocalAuthGuard } from 'src/common/guards';
import { LoginDto, RegisterDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@Body() loginDto: LoginDto) {
    await this.authService.login(loginDto);
  }

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
