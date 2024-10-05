import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../interfaces/user.interface';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  collection: 'Room',
  timestamps: true,
})
export class Room {
  @Prop({
    type: String,
    required: true,
  })
  public name: string;

  @Prop({
    type: Object,
    required: true,
  })
  public host: User;

  @Prop({
    type: [Object],
    required: true,
  })
  public users: User[];
}

export const RoomSchema = SchemaFactory.createForClass<Room>(Room);
