import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/friend/enum/friend-request.status';
import { Types } from 'mongoose';
import { FriendRequestDocument } from 'src/features/friend/schemas/friend-request.schema';
import { SendFriendRequestCommand } from '../command/send-friend-request.command';
import { FriendRequestRepository } from '../repositories/friend-request.repository';
import { NotificationRepository, UserRepository } from 'src/features/user/repositories';
import { FriendRequestGateway } from 'src/modules/websocket/gateways/fr-notification.gateway';

@CommandHandler(SendFriendRequestCommand)
export class SendFriendRequestCommandHandler
  implements ICommandHandler<SendFriendRequestCommand>
{
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly friendRequestGateway: FriendRequestGateway,
  ) {}

  public async execute(
    command: SendFriendRequestCommand,
  ): Promise<FriendRequestDocument> {
    const { user: sender, id: receiverId } = command;

    const receiverIdToObjectId = new Types.ObjectId(receiverId);

    const receiver = await this.userRepository.findById(receiverId);

    const existingRequest = await this.friendRequestRepository.findOne({
      sender: sender.id,
      receiver: receiverIdToObjectId,
    });

    if (existingRequest) {
      throw new BadRequestException('Friend request has already sent.');
    }

    const message = `${sender.username} sent a friend request.`;

    await this.notificationRepository.create({
      userId: sender.id,
      receiver: receiverId,
      message,
    });

    await this.friendRequestGateway.sendFriendRequestNotification(receiverId, message);

    const friendRequest = await this.friendRequestRepository.create({
      sender: sender.id,
      receiver: receiverIdToObjectId,
      status: FriendRequestStatus.PENDING,
    });

    sender.updateOne({ $push: { sentFriendRequests: receiverId } });
    receiver.updateOne({ $push: { receivedFriendRequests: sender.id } });

    return friendRequest.save();
  }
}
