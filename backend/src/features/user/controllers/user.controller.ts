import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { SearchUserDto } from '../dto';
import { UserDocument } from '../schemas';
import { SearchUserCommand } from '../command/search-user.command';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('search')
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  public async searchUser(@Query('query') query: SearchUserDto): Promise<UserDocument> {
    return this.queryBus.execute(new SearchUserCommand(query));
  }
}
