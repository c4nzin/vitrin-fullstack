import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/features/message/services/room.service';
import {
  IClientToServer,
  IMessage,
  IServerToClient,
  User,
} from 'src/features/message/interfaces';
import { BadRequestException, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('ChatGateway');

  @WebSocketServer() server: Server = new Server<IServerToClient, IClientToServer>();

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('chat')
  public async handleChatEvent(
    @MessageBody()
    payload: IMessage,
  ): Promise<IMessage> {
    this.logger.log(payload);
    this.server.to(payload.roomName).emit('chat', payload);
    return payload;
  }

  @SubscribeMessage('join_room')
  public async handleSetClientDataEvent(
    @MessageBody() payload: { roomName: string; user: User },
  ) {
    const room = await this.roomService.getRoomByName(payload.roomName);

    if (!room) {
      throw new BadRequestException('Room not found.');
    }

    const isParticipant = room.users.some(
      (existingUser) => existingUser.userId === payload.user.userId,
    );

    if (!isParticipant) {
      throw new BadRequestException('You are not allowed to join this room.');
    }

    if (payload.user.socketId) {
      this.logger.log(`${payload.user.socketId} is joining ${payload.roomName}`);
      await this.server.in(payload.user.socketId).socketsJoin(payload.roomName);
      await this.roomService.addUserToRoom(payload.roomName, payload.user);
    }
  }

  public async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  public async handleDisconnect(socket: Socket): Promise<void> {
    await this.roomService.removeUserFromAllRooms(socket.id);
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
