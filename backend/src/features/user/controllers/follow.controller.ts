import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Message, Paginate, User } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { CommandBus } from '@nestjs/cqrs';
import { FollowCommand } from '../cqrs/follow/command/follow.command';
import { UnfollowCommand } from '../cqrs/follow/command/unfollow.command';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
import { FetchFollowersCommand } from '../cqrs/follow/command/fetch-followers.command';
import { AuthenticatedGuard } from 'src/common/guards';
import { ApiTags } from '@nestjs/swagger';
import { SendFriendRequestCommand } from '../cqrs';
import { AcceptFriendRequestCommand } from '../cqrs/account/command/accept-friend-request.command';

@Controller()
@ApiTags('follow')
@UseGuards(AuthenticatedGuard)
export class FollowController {
  constructor(private readonly commandBus: CommandBus) {}

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
  public async getFollowers(@Param('id') id: string, @Paginate() pagination: Pagination) {
    return this.commandBus.execute(new FetchFollowersCommand(id, pagination));
  }

  @Post(':id/add-friend')
  @Message('Sucessfully sent friend request.')
  @HttpCode(HttpStatus.OK)
  public async sendFriendRequest(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new SendFriendRequestCommand(user, id));
  }

  @Post(':id/accept')
  @Message('Sucessfully sent friend request.')
  @HttpCode(HttpStatus.OK)
  public async acceptFriendRequest(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new AcceptFriendRequestCommand(user, id));
  }
}
