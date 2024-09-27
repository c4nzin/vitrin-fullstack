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
} from './schemas';
import { FriendController, PhotoController, UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { allHandlers } from './cqrs/all-handlers';
import { PostController } from './controllers/post.controller';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { FollowModule } from '../follow/follow.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    CloudinaryModule,
    CqrsModule,
    WebsocketModule,
    FollowModule,
    AccountModule,
  ],
  controllers: [PhotoController, UserController, PostController, FriendController],
  providers: [UserRepository, NotificationRepository, PostRepository, ...allHandlers],
  exports: [UserRepository, NotificationRepository, PostRepository, ...allHandlers],
})
export class UserModule {}
