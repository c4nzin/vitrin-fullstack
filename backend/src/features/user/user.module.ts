import { Module } from '@nestjs/common';
import { BookRepository, UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema, Message, MessageSchema, User, UserSchema } from './schemas';
import { MessageController, UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { allHandlers } from './cqrs/all-handlers';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { FollowModule } from '../follow/follow.module';
import { AccountModule } from '../account/account.module';
import { ChatRepository } from './repositories/chat.repository';
import { BooksController } from './controllers/book.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
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
  controllers: [BooksController, MessageController, UserController],
  providers: [UserRepository, ChatRepository, BookRepository, ...allHandlers],
  exports: [UserRepository, ChatRepository, BookRepository, ...allHandlers],
})
export class UserModule {}
