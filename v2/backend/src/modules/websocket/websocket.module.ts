import { forwardRef, Module } from '@nestjs/common';
import { FriendRequestGateway } from './gateways/fr-notification.gateway';
import { UserModule } from 'src/features/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [FriendRequestGateway],
  exports: [FriendRequestGateway],
})
export class WebsocketModule {}
