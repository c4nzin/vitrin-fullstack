import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { Notification } from '../schemas';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {
    super(notificationModel);
  }

  public async findByReceiver(receiverId: string): Promise<any> {
    const notifications = await this.findOne({ receiver: receiverId });

    if (!notifications) {
      throw new BadRequestException('No receiver found.');
    }

    return notifications;
  }
}
