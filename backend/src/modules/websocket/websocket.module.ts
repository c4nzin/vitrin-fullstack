import { forwardRef, Module } from '@nestjs/common';
import { FriendRequestGateway } from './gateways/fr-notification.gateway';
import { UserModule } from 'src/features/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';
import { MessageModule } from 'src/features/message/message.module';

@Module({
  imports: [MessageModule, forwardRef(() => UserModule)],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class WebsocketModule {}
