import { Module } from '@nestjs/common';
import { NotificationRepository, PostRepository, UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
  Post,
  PostSchema,
  User,
  UserSchema,
} from './schemas/';
import { FriendController, PhotoController, UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { FollowController } from './controllers/follow.controller';
import { allHandlers } from './cqrs/all-handlers';
import { PostController } from './controllers/post.controller';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { FriendRequestRepository } from './repositories/friend-request.repository';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: FriendRequest.name, schema: FriendRequestSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    CloudinaryModule,
    CqrsModule,
    WebsocketModule,
  ],
  controllers: [
    PhotoController,
    UserController,
    FollowController,
    PostController,
    FriendController,
  ],
  providers: [
    FriendRequestRepository,
    UserRepository,
    NotificationRepository,
    PostRepository,
    ...allHandlers,
  ],
  exports: [
    FriendRequestRepository,
    UserRepository,
    NotificationRepository,
    PostRepository,
    ...allHandlers,
  ],
})
export class UserModule {}
