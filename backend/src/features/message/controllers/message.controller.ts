import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { Room } from '../schemas/room.schema';
import { User } from 'src/common/decorators';

@Controller('rooms')
export class UserController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Get(':roomName')
  async getRoom(
    @Param('roomName') roomName: string,
    @User('id') userId: string,
  ): Promise<Room> {
    const room = await this.roomService.getRoomByName(roomName);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isParticipant = await this.roomService.isUserInRoom(roomName, userId);
    if (!isParticipant) {
      throw new ForbiddenException('You are not allowed to access this room.');
    }

    return room;
  }
}
