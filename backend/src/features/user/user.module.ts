import { Module } from '@nestjs/common';
import { BookRepository, UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema, User, UserSchema } from './schemas';
import { UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { FollowModule } from '../follow/follow.module';
import { AccountModule } from '../account/account.module';
import { BooksController } from './controllers/book.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
    CloudinaryModule,
    CqrsModule,
    WebsocketModule,
    FollowModule,
    AccountModule,
    NotificationModule,
  ],
  controllers: [BooksController, UserController],
  providers: [UserRepository, BookRepository],
  exports: [UserRepository, BookRepository],
})
export class UserModule {}
