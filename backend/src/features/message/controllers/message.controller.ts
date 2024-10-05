import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ForbiddenException,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { Room, RoomDocument } from '../schemas/room.schema';
import { User as LoggedUser } from 'src/common/decorators';
import { User } from '../interfaces';

@Controller('rooms')
export class MessageController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Get(':roomName')
  async getRoom(
    @Param('roomName') roomName: string,
    @LoggedUser('id') userId: string,
  ): Promise<Room> {
    const room = await this.roomService.getRoomByName(roomName);

    if (!room) {
      throw new NotFoundException('Room not found.');
    }

    const isParticipant = await this.roomService.isUserInRoom(roomName, userId);
    if (!isParticipant) {
      throw new ForbiddenException('You are not allowed to access this room.');
    }

    return room;
  }

  @Post('create')
  async createRoom(
    @Body() body: { roomName: string; host: User },
  ): Promise<RoomDocument> {
    const existingRoom = await this.roomService.getRoomByName(body.roomName);
    if (existingRoom) {
      throw new BadRequestException('Room with this name already exists.');
    }

    return this.roomService.createRoom(body.roomName, body.host);
  }
}
