import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { MessageService } from './services/message.service';
import { MessageRepository } from './repositories/message.repository';
import { MessageController } from './controller/message.controller';

@Module({
  imports: [
    forwardRef(() => WebsocketModule),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    CqrsModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export class MessageModule {}
