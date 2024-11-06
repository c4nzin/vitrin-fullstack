import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { SearchUserCommand } from '../command/search-user.command';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('search')
  @Message('Sucessfully fetched users.')
  @HttpCode(HttpStatus.OK)
  public async searchUser(@Query('user') query: string): Promise<UserDocument> {
    return this.queryBus.execute(new SearchUserCommand(query));
  }
}
