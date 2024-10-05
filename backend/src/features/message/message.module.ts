import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { MessageController } from '../user/controllers';
import { RoomRepository } from './repositories/room.repository';
import { RoomService } from './services/room.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    CqrsModule,
    WebsocketModule,
  ],
  controllers: [MessageController],
  providers: [RoomRepository, RoomService],
  exports: [RoomService, RoomRepository],
})
export class MessageModule {}
