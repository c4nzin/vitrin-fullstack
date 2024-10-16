import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';
import { ConversationController } from './controllers/conversation.controller';
import { ConversationRepository } from './repositories/conversation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { MessageModule } from '../message/message.module';
import { ConversationService } from './services/conversation.service';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    forwardRef(() => MessageModule),
    forwardRef(() => WebsocketModule),
  ],
  controllers: [ConversationController],
  providers: [ConversationRepository, ConversationService],
  exports: [ConversationRepository, ConversationService],
})
export class ConversationModule {}
