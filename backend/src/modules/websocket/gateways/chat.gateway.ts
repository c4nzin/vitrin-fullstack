import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/features/message/services/room.service';
import { IMessage, User } from 'src/features/message/interfaces';
import { BadRequestException, Logger } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('ChatGateway');

  @WebSocketServer() server: Server;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('chat')
  public async handleChatEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: IMessage,
  ): Promise<IMessage> {
    this.logger.log(`Message received: ${JSON.stringify(payload)}`);

    this.server.to(payload.roomName).emit('chat', payload);

    return payload;
  }

  @SubscribeMessage('joinRoom')
  public async handleSetClientDataEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: { roomName: string; user: User },
  ) {
    const room = await this.roomService.getRoomByName(payload.roomName);

    this.logger.log(
      `User ${payload.user.userId} is attempting to join room: ${payload.roomName}`,
    );
    const isParticipant = room.users.some((existingUser) => {
      return existingUser.userId === payload.user.userId;
    });

    if (!isParticipant) {
      throw new BadRequestException('You are not allowed to join this room.');
    }

    if (payload.user.socketId) {
      this.logger.log(`${payload.user.socketId} is joining ${payload.roomName}`);

      await this.server.in(payload.user.socketId).socketsJoin(payload.roomName);

      socket.join(payload.roomName);
      await this.roomService.addUserToRoom(payload.roomName, payload.user);

      socket.emit('joinedRoom', {
        roomName: payload.roomName,
        message: 'You have joined the room.',
      });

      socket.to(payload.roomName).emit('userJoined', {
        userId: payload.user.userId,
        message: 'A new user has joined the room.',
      });
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
