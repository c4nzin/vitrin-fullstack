import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatGateway');

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    await this.cacheManager.set(`user:${userId}`, socket.id);
    this.logger.log(`user connected: ${userId}, socket ID: ${socket.id}`);
  }

  public handleDisconnect(socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    this.cacheManager.del(`user:${userId}`);

    this.logger.log(`user disconnected: ${userId}, socket ID: ${socket.id}`);
  }

  @SubscribeMessage('join-conversation')
  public async handleJoinConversation(
    @MessageBody() conversationId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const conversation = JSON.stringify(conversationId);
    socket.join(JSON.stringify(conversationId));
    this.logger.log(`User joined conversation: ${conversation}`);
  }
}
