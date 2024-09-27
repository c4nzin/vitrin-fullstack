import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LOCAL_STRATEGY } from '../serializer/constants';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from '../dto';
import { LoginUserCommand } from '../cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super();
  }

  public async validate(username: string, password: string) {
    const loginDto = plainToInstance(LoginDto, { username, password }); //TODO : add mapper soon!

    const user = await this.commandBus.execute(new LoginUserCommand(loginDto));

    if (!user) {
      throw new UnauthorizedException('Error validating user.');
    }

    return user;
  }
}
