import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FRIEND_REQUEST_NOTIFICATION } from '../constants';
import { UserRepository } from 'src/features/user/repositories';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ origin: '*' })
export class FriendRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userRepository: UserRepository) {}

  handleConnection(client: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  @WebSocketServer()
  public readonly server: Server;

  public handleDisconnect(client: Server): void {
    Logger.log(`${client} is disconnected`);
  }

  @SubscribeMessage(FRIEND_REQUEST_NOTIFICATION)
  public async sendFriendRequestNotification(
    userId: string,
    message: string,
  ): Promise<boolean> {
    return this.server.to(userId).emit(FRIEND_REQUEST_NOTIFICATION, message);
  }
}
