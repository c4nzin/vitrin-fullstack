import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Paginate, User } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { CommandBus } from '@nestjs/cqrs';
import { FollowCommand } from '../cqrs/follow/command/follow.command';
import { UnfollowCommand } from '../cqrs/follow/command/unfollow.command';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
import { FetchFollowersCommand } from '../cqrs/follow/command/fetch-followers.command';
import { AuthenticatedGuard } from 'src/common/guards';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class FollowController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':id/follow')
  public async follow(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new FollowCommand(user, id));
  }

  @Delete(':id/unfollow')
  public async unfollow(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UnfollowCommand(user, id));
  }

  @Get(':id/followers')
  public async getFollowers(@Param('id') id: string, @Paginate() pagination: Pagination) {
    return this.commandBus.execute(new FetchFollowersCommand(id, pagination));
  }
}
