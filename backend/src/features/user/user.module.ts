import { Module } from '@nestjs/common';
import { BookRepository, PostRepository, UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Book,
  BookSchema,
  Message,
  MessageSchema,
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
import { BooksController } from './controllers/book.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Book.name, schema: BookSchema },
    ]),
    CloudinaryModule,
    CqrsModule,
    WebsocketModule,
    FollowModule,
    AccountModule,
    NotificationModule,
  ],
  controllers: [
    PhotoController,
    PostController,
    FriendController,
    BooksController,
    ChatController,
    MessageController,
  ],
  providers: [
    UserRepository,
    PostRepository,
    ChatRepository,
    BookRepository,
    ...allHandlers,
  ],
  exports: [
    UserRepository,
    PostRepository,
    ChatRepository,
    BookRepository,
    ...allHandlers,
  ],
})
export class UserModule {}
