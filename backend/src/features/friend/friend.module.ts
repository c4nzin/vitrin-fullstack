import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { FollowModule } from '../follow/follow.module';
import { UserModule } from '../user/user.module';
import { FriendController } from './controllers/friend.controller';
import { allFriendHandlers } from './handler/all-friend.handlers';
import { FriendRequestRepository } from './repositories/friend-request.repository';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => NotificationModule),
    CqrsModule,
    CloudinaryModule,
    FollowModule,
    WebsocketModule,
  ],
  controllers: [FriendController],
  providers: [FriendRequestRepository, ...allFriendHandlers],
  exports: [FriendRequestRepository, ...allFriendHandlers],
})
export class FriendModule {}
