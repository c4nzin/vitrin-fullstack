import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRepository } from 'src/features/user/repositories';

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
  public async handleMessage(
    client: Socket,
    payload: { receiverId: string; senderId: string; message: string },
  ) {
    const { senderId, receiverId, message } = payload;

    const savedMessage = await this.chatRepository.saveMessage(
      senderId,
      receiverId,
      message,
    );

    this.server.to(senderId).emit('receiveMessage', savedMessage);
    this.server.to(receiverId).emit('receiveMessage', savedMessage);
  }
}
