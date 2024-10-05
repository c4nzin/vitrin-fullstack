import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { RoomRepository } from './repositories/room.repository';
import { RoomService } from './services/room.service';
import { MessageController } from './controllers/message.controller';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  imports: [
    forwardRef(() => WebsocketModule),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
    CqrsModule,
  ],
  controllers: [MessageController],
  providers: [RoomRepository, RoomService],
  exports: [RoomService, RoomRepository],
})
export class MessageModule {}
