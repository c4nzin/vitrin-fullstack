import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { RedisService } from 'src/modules/redis/services/redis.service';
import { GatewayInstance } from '../gateway.instance';

export class FriendRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('FriendRequestGateway');

  constructor(
    private readonly redisService: RedisService,
    private readonly gatewayInstance: GatewayInstance,
  ) {}

  @WebSocketServer()
  public get server(): Server {
    return this.gatewayInstance.server;
  }

  public async handleDisconnect(socket: Socket): Promise<void> {
    const userId = socket.handshake.query.userId as string;
    await this.redisService.del(`user:${userId}`);
    this.logger.log(`User disconnected ${userId} socketId : ${socket.id}`);
  }

  public async handleConnection(socket: Socket): Promise<void> {
    const userId = socket.handshake.query.userId as string;
    await this.redisService.set(`user${userId}`, socket.id);
    this.logger.log(`User connected ${userId} socketId : ${socket.id}`);
  }
}
