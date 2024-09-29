import { forwardRef, Module } from '@nestjs/common';
import { FriendRequestGateway } from './gateways/fr-notification.gateway';
import { UserModule } from 'src/features/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [FriendRequestGateway, ChatGateway],
  exports: [FriendRequestGateway, ChatGateway],
})
export class WebsocketModule {}
