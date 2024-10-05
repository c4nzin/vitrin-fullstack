import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({
    required: true,
  })
  public receiverId: string;

  @Prop({
    required: true,
  })
  public senderId: string;

  @Prop({
    required: true,
  })
  public message: string;

  @Prop({
    default: Date.now(),
  })
  public createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass<Message>(Message);
