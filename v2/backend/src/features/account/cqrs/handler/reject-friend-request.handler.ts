import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectFriendRequestCommand } from '../command/reject-friend-request.command';
import { FriendRequestRepository } from 'src/features/account/repositories/friend-request.repository';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/user/enum/friend-request.status';

@CommandHandler(RejectFriendRequestCommand)
export class RejectFriendRequestCommandHandler
  implements ICommandHandler<RejectFriendRequestCommand>
{
  constructor(private readonly friendRequestRepository: FriendRequestRepository) {}

  public async execute(command: RejectFriendRequestCommand): Promise<void> {
    const { requestId } = command;

    const request = await this.friendRequestRepository.findById(requestId);

    if (!request) {
      throw new BadRequestException('No request found to reject.');
    }

    request.status = FriendRequestStatus.REJECTED;
    request.respondedAt = new Date();
    request.deleteOne();
  }
}
