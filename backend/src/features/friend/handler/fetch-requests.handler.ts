import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationRepository } from 'src/features/user/repositories';
import { PageDto, PageMetaDto } from 'src/common/pagination/dto';
import { FetchRequestCommand } from '../command/fetch-requests.command';
import { FriendRequestGateway } from 'src/modules/websocket/gateways/fr-notification.gateway';

@QueryHandler(FetchRequestCommand)
export class FetchRequestCommandHandler implements IQueryHandler<FetchRequestCommand> {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly friendRequestGateway: FriendRequestGateway,
  ) {}

  public async execute(query: FetchRequestCommand): Promise<any> {
    const { user, pagination } = query;

    const notifications = await this.notificationRepository.findByReceiver(user.id);

    const itemCount: any = await this.notificationRepository.countDocuments({
      _id: { $in: notifications.id },
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto: pagination, itemCount });

    const pageDto = new PageDto(notifications, pageMetaDto);

    return this.friendRequestGateway.server
      .to(user.id)
      .emit('all-notifications', pageDto.data);
  }
}
