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

    if (request) {
      throw new BadRequestException('Friend request not found.');
    }

    if (request.status !== FriendRequestStatus.PENDING) {
      throw new BadRequestException('Friend request is already processed.');
    }

    request.status = FriendRequestStatus.ACCEPTED;
    request.respondedAt = new Date();

    await request.save();

    const sender = await this.userRepository.findById(request.sender.toString());
    const receiver = await this.userRepository.findById(request.receiver.toString());

    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);

    await sender.save();
    await receiver.save();
  }
}
