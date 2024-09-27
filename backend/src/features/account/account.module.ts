import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { FriendRequestRepository } from './repositories/friend-request.repository';
import { FriendController } from './controllers/friend.controller';
import { UserModule } from '../user/user.module';
import { allHandlers } from '../user/cqrs/all-handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { FollowModule } from '../follow/follow.module';
import { FriendRequestGateway } from 'src/modules/websocket/gateways/fr-notification.gateway';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
    forwardRef(() => UserModule),
    CqrsModule,
    CloudinaryModule,
    FollowModule,
    WebsocketModule,
  ],
  controllers: [FriendController],
  providers: [FriendRequestRepository, ...allHandlers],
  exports: [FriendRequestRepository, ...allHandlers],
})
export class AccountModule {}
