import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/user/enum/friend-request.status';
import { Types } from 'mongoose';
import { FriendRequestDocument } from 'src/features/friend/schemas/friend-request.schema';
import { SendFriendRequestCommand } from '../command/send-friend-request.command';
import { FriendRequestRepository } from '../repositories/friend-request.repository';
import { NotificationRepository, UserRepository } from 'src/features/user/repositories';

@CommandHandler(SendFriendRequestCommand)
export class SendFriendRequestCommandHandler
  implements ICommandHandler<SendFriendRequestCommand>
{
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
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
