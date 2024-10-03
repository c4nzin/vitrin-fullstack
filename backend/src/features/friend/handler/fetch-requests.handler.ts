import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationRepository } from 'src/features/user/repositories';
import { PageDto, PageMetaDto } from 'src/common/pagination/dto';
import { FetchRequestCommand } from '../command/fetch-requests.command';

@QueryHandler(FetchRequestCommand)
export class FetchRequestCommandHandler implements IQueryHandler<FetchRequestCommand> {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  public async execute(query: FetchRequestCommand): Promise<any> {
    const { user, pagination } = query;

    const notifications = await this.notificationRepository.findByReceiver(user.id);

    const itemCount: any = await this.notificationRepository.countDocuments({
      _id: { $in: notifications.id },
    });

    const pageDto = new PageMetaDto({ pageOptionsDto: pagination, itemCount });

    return new PageDto(notifications, pageDto);
  }
}
