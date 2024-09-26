import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Message, User } from 'src/common/decorators';
import {
  SendFriendRequestCommand,
  AcceptFriendRequestCommand,
  RejectFriendRequestCommand,
} from '../../user/cqrs';
import { UserDocument } from '../../user/schemas';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FriendRequestGateway } from 'src/modules/websocket/gateways/fr-notification.gateway';
import { ApiTags } from '@nestjs/swagger';
import { PageDto, PageOptionsDto } from 'src/common/pagination/dto';
import { FetchRequestCommand } from '../cqrs/command/fetch-requests.command';

@Controller()
@ApiTags('Friends')
export class FriendController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly friendRequestGateway: FriendRequestGateway,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/add-friend')
  @Message('Sucessfully sent friend request.')
  @HttpCode(HttpStatus.OK)
  public async sendFriendRequest(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<void> {
    const message = `${user.username} sent a friend request to you.`;

    await this.friendRequestGateway.sendFriendRequestNotification(id, message);

    return this.commandBus.execute(new SendFriendRequestCommand(user, id));
  }

  @Post(':id/accept-friend')
  @Message('Sucessfully accepted friend request.')
  @HttpCode(HttpStatus.OK)
  public async acceptFriendRequest(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new AcceptFriendRequestCommand(user, id));
  }

  @Delete(':id/reject-friend')
  @Message('Sucessfully rejected friend request.')
  @HttpCode(HttpStatus.OK)
  public async rejectFriendRequest(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new RejectFriendRequestCommand(id));
  }

  @Get('notifications')
  @Message('Sucessfully fetched the notifications.')
  @HttpCode(HttpStatus.OK)
  public async fetchNotifications(
    @User() user: UserDocument,
    @Query() paginate: PageOptionsDto,
  ): Promise<PageDto<any>> {
    return this.queryBus.execute(new FetchRequestCommand(user, paginate));
  }
}
