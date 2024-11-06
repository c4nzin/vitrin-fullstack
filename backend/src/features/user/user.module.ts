import { Module } from '@nestjs/common';
import { UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { FollowModule } from '../follow/follow.module';
import { AccountModule } from '../account/account.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CloudinaryModule,
    CqrsModule,
    WebsocketModule,
    FollowModule,
    AccountModule,
    NotificationModule,
  ],
  controllers: [UserController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
