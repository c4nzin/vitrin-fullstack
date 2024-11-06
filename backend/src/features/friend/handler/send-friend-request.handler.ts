import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { FriendRequestStatus } from 'src/features/friend/enum/friend-request.status';
import { Types } from 'mongoose';
import { FriendRequestDocument } from 'src/features/friend/schemas/friend-request.schema';
import { SendFriendRequestCommand } from '../command/send-friend-request.command';
import { FriendRequestRepository } from '../repositories/friend-request.repository';
import { UserRepository } from 'src/features/user/repositories';
import { FriendRequestGateway } from 'src/modules/websocket/gateways/fr-notification.gateway';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { NotificationRepository } from 'src/features/notification/repositories/notification.repository';

@CommandHandler(SendFriendRequestCommand)
export class SendFriendRequestCommandHandler
  implements ICommandHandler<SendFriendRequestCommand>
{
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly friendRequestGateway: FriendRequestGateway,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
      receiverId: receiverId,
      message,
    });

    const receivedSocketUser = (await this.cacheManager.get(
      `user:${receiverId}`,
    )) as string;

    if (receivedSocketUser) {
      this.friendRequestGateway.server
        .to(receivedSocketUser)
        .emit('new-friend-request', { message });
    }

    const friendRequest = await this.friendRequestRepository.create({
      sender: sender.id,
      receiver: receiverId,
      status: FriendRequestStatus.PENDING,
    });

    sender.updateOne({ $push: { sentFriendRequests: receiverId } });
    receiver.updateOne({ $push: { receivedFriendRequests: sender.id } });

    return friendRequest.save();
  }
}
