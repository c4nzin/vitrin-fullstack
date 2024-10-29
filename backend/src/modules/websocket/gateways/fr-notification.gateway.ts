import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserRepository } from 'src/features/user/repositories';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ origin: '*' })
export class FriendRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userRepository: UserRepository) {}

  @WebSocketServer()
  public readonly server: Server;

  public handleDisconnect(client: Server): void {
    Logger.log(`${client} is disconnected`);
  }

  handleConnection(client: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
}
