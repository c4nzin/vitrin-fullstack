import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import {
  FriendRequest,
  FriendRequestSchema,
} from '../account/schemas/friend-request.schema';
import { FollowModule } from '../follow/follow.module';
import { UserModule } from '../user/user.module';

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
  providers: [FriendRequestRepository, ...allHandlers],
})
export class FriendModule {}
