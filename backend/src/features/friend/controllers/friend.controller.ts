import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Message, User } from 'src/common/decorators';
import { UserDocument } from '../../user/schemas';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { SendFriendRequestCommand } from '../command/send-friend-request.command';
import { RejectFriendRequestCommand } from '../command/reject-friend-request.command';
import { AcceptFriendRequestCommand } from '../command/accept-friend-request.command';
import { AuthenticatedGuard } from 'src/common/guards';

@Controller('users')
@UseGuards(AuthenticatedGuard)
@ApiTags('Friends')
export class FriendController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':id/add-friend')
  @Message('Sucessfully sent friend request.')
  @HttpCode(HttpStatus.OK)
  public async sendFriendRequest(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new SendFriendRequestCommand(user, id));
  }

  @Post(':id/accept-friend')
  @Message('Successfully accepted friend request.')
  @HttpCode(HttpStatus.OK)
  public async acceptFriendRequest(
    @User() user: UserDocument,
    @Param('id') requestId: string,
  ): Promise<void> {
    return this.commandBus.execute(new AcceptFriendRequestCommand(requestId, user)); // Parametrelerin sırasını kontrol edin
  }

  @Delete(':id/reject-friend')
  @Message('Sucessfully rejected friend request.')
  @HttpCode(HttpStatus.OK)
  public async rejectFriendRequest(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new RejectFriendRequestCommand(id));
  }
}
