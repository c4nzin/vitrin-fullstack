import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LOCAL_STRATEGY } from '../serializer/constants';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Error validating user.');
    }

    return user;
  }
}
