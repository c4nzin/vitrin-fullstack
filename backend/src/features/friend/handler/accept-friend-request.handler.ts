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

    console.log(requestId, user.id);

    const request = await this.friendRequestRepository.findOne({
      $or: [
        { sender: requestId, receiver: user.id },
        { sender: user.id, receiver: requestId },
      ],
    });

    if (!request) {
      throw new BadRequestException('Friend request not found.');
    }

    const receiver = await this.userRepository.findById(request.receiver.toString());
    if (!receiver) {
      throw new BadRequestException('Receiver not found.');
    }

    request.status = FriendRequestStatus.ACCEPTED;
    request.respondedAt = new Date();
    await request.save();

    await this.userRepository.updateOne(
      { _id: user.id },
      { $push: { friends: request.receiver } },
    );
    await this.userRepository.updateOne(
      { _id: request.receiver },
      { $push: { friends: user.id } },
    );

    await request.deleteOne();
  }
}
