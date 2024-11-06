import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/features/user/user.module';
import { MessageModule } from 'src/features/message/message.module';
import { ConversationModule } from 'src/features/conversation/conversation.module';
import { ChatGateway } from './gateways/chat.gateway';
import { FriendRequestGateway } from './gateways/fr-notification.gateway';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    forwardRef(() => MessageModule),
    forwardRef(() => UserModule),
    ConversationModule,
    RedisModule,
  ],
  providers: [ChatGateway, FriendRequestGateway],
  exports: [ChatGateway, FriendRequestGateway],
})
export class WebsocketModule {}
