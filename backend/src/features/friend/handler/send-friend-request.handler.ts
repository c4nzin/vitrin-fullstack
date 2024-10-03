import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendFriendRequestCommand } from '../../../friend/command/send-friend-request.command';
import { FriendRequestRepository } from 'src/features/account/repositories/friend-request.repository';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/user/enum/friend-request.status';
import { Types } from 'mongoose';
import { NotificationRepository, UserRepository } from 'src/features/user/repositories';
import { FriendRequestDocument } from '../../schemas/friend-request.schema';

@CommandHandler(SendFriendRequestCommand)
export class SendFriendRequestCommandHandler
  implements ICommandHandler<SendFriendRequestCommand>
{
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    command: SendFriendRequestCommand,
  ): Promise<FriendRequestDocument> {
    const { user: sender, id: receiverId } = command;

    const receiverIdToObjectId = new Types.ObjectId(receiverId);

    //bad code just for now need refactor

    const receiver = await this.userRepository.findById(receiverId);

    const existingRequest = await this.friendRequestRepository.findOne({
      sender: sender.id,
      receiver: receiverIdToObjectId,
    });

    if (existingRequest) {
      throw new BadRequestException('Friend request already sent.');
    }

    const friendRequest = await this.friendRequestRepository.create({
      sender: sender.id,
      receiver: receiverIdToObjectId,
      status: FriendRequestStatus.PENDING,
    });

    sender.updateOne({ $push: { sentFriendRequests: receiverId } });
    receiver.updateOne({ $push: { receivedFriendRequests: sender.id } });

    await this.notificationRepository.create({
      isRead: false,
      message: `${sender.username} sent a friend request to you.`,
      userId: sender.id,
      receiver: receiverId,
    });

    return friendRequest.save();
  }
}
