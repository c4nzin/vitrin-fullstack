import { Module } from '@nestjs/common';
import { NotificationRepository, PostRepository, UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Message,
  MessageSchema,
  Notification,
  NotificationSchema,
  Post,
  PostSchema,
  User,
  UserSchema,
} from './schemas';
import {
  FriendController,
  MessageController,
  PhotoController,
  UserController,
} from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { allHandlers } from './cqrs/all-handlers';
import { PostController } from './controllers/post.controller';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { FollowModule } from '../follow/follow.module';
import { AccountModule } from '../account/account.module';
import { ChatController } from './controllers/chat.controller';
import { ChatRepository } from './repositories/chat.repository';
import { ChatGateway } from 'src/modules/websocket/gateways/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    CloudinaryModule,
    CqrsModule,
    WebsocketModule,
    FollowModule,
    AccountModule,
  ],
  controllers: [
    PhotoController,
    UserController,
    PostController,
    FriendController,
    ChatController,
    MessageController,
  ],
  providers: [
    UserRepository,
    NotificationRepository,
    PostRepository,
    ChatRepository,
    ...allHandlers,
  ],
  exports: [
    UserRepository,
    NotificationRepository,
    PostRepository,
    ChatRepository,
    ...allHandlers,
  ],
})
export class UserModule {}
