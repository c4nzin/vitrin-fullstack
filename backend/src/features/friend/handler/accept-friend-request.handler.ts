import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/friend/enum/friend-request.status';
import { UserRepository } from 'src/features/user/repositories';
import { AcceptFriendRequestCommand } from '../command/accept-friend-request.command';
import { FriendRequestRepository } from '../repositories/friend-request.repository';

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
    const requestReceiverId = request.receiver as unknown as string;

    if (!request) {
      throw new BadRequestException('Friend request not found.');
    }

    request.status = FriendRequestStatus.ACCEPTED;
    request.respondedAt = new Date();

    if (request.status == FriendRequestStatus.ACCEPTED) {
      const receiver = await this.userRepository.findById(requestReceiverId);

      await user.updateOne({ $push: { friends: requestId } });
      await receiver.updateOne({ $push: { friends: request.sender.id } });
    }

    await request.deleteOne();
  }
}
