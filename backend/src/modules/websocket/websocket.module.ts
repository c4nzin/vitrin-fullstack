import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/features/user/user.module';
import { MessageModule } from 'src/features/message/message.module';
import { ConversationModule } from 'src/features/conversation/conversation.module';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [
    forwardRef(() => MessageModule),
    forwardRef(() => UserModule),
    ConversationModule,
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class WebsocketModule {}
