import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({
  collection: 'Conversation',
  timestamps: true,
  versionKey: false,
})
export class Conversation {
  @Prop({
    required: true,
    type: String,
  })
  public senderId: string;

  @Prop({
    required: true,
    type: String,
  })
  public receiverId: string;

  @Prop({
    required: true,
    type: String,
  })
  public lastMessage: string;

  @Prop({
    required: true,
    type: String,
  })
  public profilePhoto: string;

  @Prop({
    required: true,
    type: String,
  })
  public username: string;

  @Prop({ unique: true, required: true })
  public conversationId: string;
}

export const ConversationSchema =
  SchemaFactory.createForClass<Conversation>(Conversation);
