import { forwardRef, Module } from '@nestjs/common';
import { FriendRequestNotification } from './gateways/fr-notification.gateway';
import { UserModule } from 'src/features/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [FriendRequestNotification],
  exports: [FriendRequestNotification],
})
export class WebsocketModule {}
