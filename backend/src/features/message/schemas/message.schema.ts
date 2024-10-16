import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/features/user/schemas';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Message {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  public sender: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Conversation',
    required: true,
  })
  public conversation: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  public content: string;
}

export const MessageSchema = SchemaFactory.createForClass<Message>(Message);
