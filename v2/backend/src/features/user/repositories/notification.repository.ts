import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Notification } from '../schemas';
import { Model } from 'mongoose';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {
    super(notificationModel);
  }
}
