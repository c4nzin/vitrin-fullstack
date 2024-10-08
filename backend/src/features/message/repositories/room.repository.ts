import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Room, RoomDocument } from '../schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces';
import { DeleteResult } from 'src/core/repositories/types/query.types';

@Injectable()
export class RoomRepository extends BaseRepository<Room> {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {
    super(roomModel);
  }

  public async createRoom(roomName: string, host: User): Promise<RoomDocument> {
    const room = this.findRoomByName(roomName);

    // if (!room) {
    //   return this.roomModel.create({ name: roomName, host, users: [host] });
    // }

    return this.roomModel.create({ name: roomName, host, users: [host] });
  }

  public async findRoomByName(roomName: string): Promise<RoomDocument> {
    const room = await this.findOne({ name: roomName });

    return room;
  }

  public async removeRoom(roomName: string): Promise<DeleteResult<any>> {
    const room = await this.findRoomByName(roomName);
    return room.deleteOne();
  }
}
