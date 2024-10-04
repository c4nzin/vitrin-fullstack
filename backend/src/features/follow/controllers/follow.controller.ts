import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Message, User } from 'src/common/decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FollowCommand } from '../command/follow.command';
import { UnfollowCommand } from '../command/unfollow.command';
import { FetchFollowersCommand } from '../command/fetch-followers.command';
import { AuthenticatedGuard } from 'src/common/guards';
import { ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/pagination/dto';
import { PageOptionsDto } from 'src/common/pagination/dto/page-options.dto';
import { UserDocument } from 'src/features/user/schemas';

@Controller()
@ApiTags('follow')
@UseGuards(AuthenticatedGuard)
export class FollowController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/follow')
  @Message('Sucessfully followed the user.')
  @HttpCode(HttpStatus.OK)
  public async follow(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new FollowCommand(user, id));
  }

  @Delete(':id/unfollow')
  @Message('Sucessfully unfollowed the user.')
  @HttpCode(HttpStatus.OK)
  public async unfollow(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UnfollowCommand(user, id));
  }

  @Get(':id/followers')
  @Message('Sucessfully fetched users.')
  @HttpCode(HttpStatus.OK)
  public async getFollowers(
    @Param('id') id: string,
    @Query() paginate: PageOptionsDto,
  ): Promise<PageDto<any>> {
    return this.queryBus.execute(new FetchFollowersCommand(id, paginate));
  }
}
