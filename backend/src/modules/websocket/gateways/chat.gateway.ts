import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageService } from 'src/features/message/services/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatGateway');

  constructor(private readonly messageService: MessageService) {}

  handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    socket.join(userId);
    this.logger.log(`User connected: ${userId}, socket ID: ${socket.id}`);
  }

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

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() payload: { senderId: string; receiverId: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const messages = await this.messageService.getMessagesBetweenUsers(
      payload.senderId,
      payload.receiverId,
    );
    socket.emit('receiveMessages', messages);
  }

  @SubscribeMessage('getConversations')
  async handleGetConversations(
    @MessageBody() payload: { userId: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const conversations = await this.messageService.getConversations(payload.userId);

    socket.emit('receiveConversations', conversations);
  }
}
