import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';
import { ConversationController } from './controllers/conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { ConversationRepository } from './repositories/conversation.repository';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    forwardRef(() => MessageModule),
  ],
  controllers: [ConversationController],
  providers: [ConversationRepository],
  exports: [ConversationRepository],
})
export class ConversationModule {}
