import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  versionKey: false,
})
export class Notification {
  @Prop({
    type: String,
    ref: 'User',
    required: true,
  })
  public userId: string;

  @Prop({
    type: String,
    ref: 'User',
    required: true,
  })
  public receiverId: string;

  @Prop({
    type: String,
    required: true,
  })
  public message: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  public isRead: boolean;
}

export const NotificationSchema =
  SchemaFactory.createForClass<Notification>(Notification);
