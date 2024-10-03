import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { NotificationRepository } from './repositories/notification.repository';
import { FriendModule } from '../friend/friend.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    WebsocketModule,
    FriendModule,
    CqrsModule,
    forwardRef(() => UserModule),
  ],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationModule {}
