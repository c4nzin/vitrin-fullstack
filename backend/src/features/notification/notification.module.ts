import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { NotificationRepository } from './repositories/notification.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    WebsocketModule,
    CqrsModule,
    forwardRef(() => UserModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationModule {}
