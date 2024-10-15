import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/features/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';
import { MessageModule } from 'src/features/message/message.module';
import { ConversationModule } from 'src/features/conversation/conversation.module';

@Module({
  imports: [MessageModule, forwardRef(() => UserModule), ConversationModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class WebsocketModule {}
