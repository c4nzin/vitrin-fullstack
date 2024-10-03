import { forwardRef, Module } from '@nestjs/common';
import { FriendRequestRepository } from './repositories/friend-request.repository';
import { FriendController } from '../friend/controllers/friend.controller';
import { UserModule } from '../user/user.module';
import { allHandlers } from '../user/cqrs/all-handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';

@Module({
  imports: [forwardRef(() => UserModule), CqrsModule, CloudinaryModule],
  providers: [FriendRequestRepository, ...allHandlers],
  exports: [FriendRequestRepository, ...allHandlers],
})
export class AccountModule {}
