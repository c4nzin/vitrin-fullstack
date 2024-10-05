import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../repositories/room.repository';
import { User } from '../interfaces';
import { RoomDocument } from '../schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async addUserToRoom(roomName: string, user: User): Promise<void> {
    const room = await this.getRoomByName(roomName);

    if (!room.users.some((existingUser) => existingUser.userId === user.userId)) {
      room.users.push(user);
      await room.save();

      const host = await this.getRoomHost(roomName);
      if (host.userId === user.userId) {
        room.host.socketId = user.socketId;
        await room.save();
      }
    }
  }

  public async removeUserFromRoom(socketId: string, roomName: string): Promise<void> {
    const room = await this.getRoomByName(roomName);

    room.users = room.users.filter((user) => user.socketId !== socketId);
    await room.save();

    if (room.users.length === 0) {
      await this.roomRepository.removeRoom(roomName);
    }
  }

  public async getRoomHost(roomName: string): Promise<User> {
    const room = await this.getRoomByName(roomName);
    return room.host;
  }

  public async removeUserFromAllRooms(socketId: string): Promise<void> {
    const rooms = await this.roomRepository.findRoomsByUserSocketId(socketId);
    for (const room of rooms) {
      await this.removeUserFromRoom(socketId, room.name);
    }
  }

  public async getRooms() {
    return this.roomRepository.find({});
  }
  public async getRoomByName(roomName: string): Promise<RoomDocument> {
    return this.roomRepository.findRoomByName(roomName);
  }

  public async isUserInRoom(roomName: string, userId: string): Promise<boolean> {
    const room = await this.getRoomByName(roomName);
    return room.users.some((user) => user.userId === userId);
  }

  public async createRoom(roomName: string, host: User): Promise<RoomDocument> {
    return this.roomRepository.createRoom(roomName, host);
  }
}
