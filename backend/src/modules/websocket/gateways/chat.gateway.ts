import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageService } from 'src/features/message/services/message.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatGateway');

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { senderId: string; receiverId: string; content: string },
  ): Promise<void> {
    const { senderId, receiverId, content } = payload;

    const message = await this.messageService.createMessage(
      senderId,
      receiverId,
      content,
    );

    this.server.to(receiverId).emit('receiveMessage', message);

    this.logger.log(`Message from ${senderId} to ${receiverId}: ${content}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { userId: string },
  ): Promise<void> {
    const { userId } = payload;

    socket.join(userId);
    this.logger.log(`User ${userId} joined room.`);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { senderId: string; receiverId: string },
  ): Promise<void> {
    const { senderId, receiverId } = payload;

    const messages = await this.messageService.getMessagesBetweenUsers(
      senderId,
      receiverId,
    );

    console.log(messages);

    socket.emit('receiveMessages', messages);
  }
}
