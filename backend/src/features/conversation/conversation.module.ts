import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';
import { ConversationController } from './controllers/conversation.controller';

@Module({
  imports: [CqrsModule, forwardRef(() => UserModule)],
  controllers: [ConversationController],
  providers: [],
  exports: [],
})
export class ConversationModule {}
