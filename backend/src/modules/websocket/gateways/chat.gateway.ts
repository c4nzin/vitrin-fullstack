import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/features/user/dto';
import { ChatRepository } from 'src/features/user/repositories';
import { RECEIVE_MESSAGE } from '../constants';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatRepository: ChatRepository) {}

  public async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;

    client.join(userId);
  }

  public async handleDisconnect(client: Socket) {}

  @SubscribeMessage('sendMessage')
  public async handleMessage(client: Socket, payload: CreateMessageDto) {
    const savedMessage = await this.chatRepository.saveMessage(payload);

    this.server.to(payload.senderId).emit(RECEIVE_MESSAGE, savedMessage);
    this.server.to(payload.receiverId).emit(RECEIVE_MESSAGE, savedMessage);
  }
}
