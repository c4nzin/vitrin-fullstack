import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/features/user/schemas';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Conversation {
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: true,
  })
  public participants: Types.ObjectId[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Message',
  })
  public lastMessage: Types.ObjectId;
}

export const ConversationSchema =
  SchemaFactory.createForClass<Conversation>(Conversation);
