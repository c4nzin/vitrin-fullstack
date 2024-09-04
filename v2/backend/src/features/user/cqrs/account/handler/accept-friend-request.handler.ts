import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptFriendRequestCommand } from '../command/accept-friend-request.command';
import { FriendRequestRepository } from 'src/features/user/repositories/friend-request.repository';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/user/enum/friend-request.status';
import { UserRepository } from 'src/features/user/repositories';

@CommandHandler(AcceptFriendRequestCommand)
export class AcceptFriendRequestCommandHandler
  implements ICommandHandler<AcceptFriendRequestCommand>
{
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: AcceptFriendRequestCommand): Promise<void> {
    const { requestId, user } = command;

    const request = await this.friendRequestRepository.findById(requestId);

    if (!request) {
      throw new BadRequestException('Friend request not found.');
    }

    request.status = FriendRequestStatus.ACCEPTED;
    request.respondedAt = new Date();

    if (request.status == FriendRequestStatus.ACCEPTED) {
      const receiver = await this.userRepository.findById(
        request.receiver._id.toString(),
      );

      await user.updateOne({ friends: request.receiver.id });
      await receiver.updateOne({ friends: request.sender.id });

      await request.deleteOne();
    }
  }
}
