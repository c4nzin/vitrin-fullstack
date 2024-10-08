import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { MessageService } from './services/message.service';
import { MessageRepository } from './repositories/message.repository';

@Module({
  imports: [
    forwardRef(() => WebsocketModule),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    CqrsModule,
  ],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export class MessageModule {}
