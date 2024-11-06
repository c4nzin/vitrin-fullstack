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
import { Logger } from '@nestjs/common';
import { RedisService } from 'src/modules/redis/services/redis.service';
import { GatewayInstance } from '../gateway.instance';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('ChatGateway');

  constructor(
    private readonly redisService: RedisService,
    private readonly gatewayInstance: GatewayInstance,
  ) {}

  @WebSocketServer()
  public get server(): Server {
    return this.gatewayInstance.server;
  }

  public async handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    await this.redisService.set(`user:${userId}`, socket.id);

    this.logger.log(`user connected: ${userId}, socket ID: ${socket.id}`);
  }

  public async handleDisconnect(socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    await this.redisService.del(`user:${userId}`);

    this.logger.log(`user disconnected: ${userId}, socket ID: ${socket.id}`);
  }

  @SubscribeMessage('join-conversation')
  public async handleJoinConversation(
    @MessageBody() conversationId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const conversation = JSON.stringify(conversationId);
    socket.join(conversationId);
    this.logger.log(`User joined conversation: ${conversation}`);
  }
}
