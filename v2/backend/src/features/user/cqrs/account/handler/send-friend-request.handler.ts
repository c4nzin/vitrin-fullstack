import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendFriendRequestCommand } from '../command/send-friend-request.command';
import { FriendRequestRepository } from 'src/features/user/repositories/friend-request.repository';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/user/enum/friend-request.status';
import { Types } from 'mongoose';
import { FriendRequestDocument } from 'src/features/user/schemas/friend-request.schema';
import { NotificationRepository } from 'src/features/user/repositories';

@CommandHandler(SendFriendRequestCommand)
export class SendFriendRequestCommandHandler
  implements ICommandHandler<SendFriendRequestCommand>
{
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async execute(
    command: SendFriendRequestCommand,
  ): Promise<FriendRequestDocument> {
    const { user: sender, id: receiverId } = command;

    const receiverIdToObjectId = new Types.ObjectId(receiverId);

    const existingRequest = await this.friendRequestRepository.findOne({
      sender: sender.id,
      receiver: receiverId,
    });

    if (existingRequest) {
      throw new BadRequestException('Friend request already sent.');
    }

    const friendRequest = await this.friendRequestRepository.create({
      sender: sender.id,
      receiver: receiverIdToObjectId,
      status: FriendRequestStatus.PENDING,
    });

    await this.notificationRepository.create({
      isRead: false,
      message: `${sender.username} sent a friend request to you.`,
      userId: sender.id,
      receiver: receiverId,
    });

    return friendRequest.save();
  }
}
