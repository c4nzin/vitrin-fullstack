import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { FriendRequestStatus } from 'src/features/friend/enum/friend-request.status';

export type FriendRequestDocument = HydratedDocument<FriendRequest>;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'FriendRequest',
})
export class FriendRequest {
  @Prop({
    type: String,
    required: true,
    ref: 'User',
  })
  public sender: string;

  @Prop({
    type: String,
    required: true,
    ref: 'User',
  })
  public receiver: string;

  @Prop({
    required: true,
    enum: FriendRequestStatus,
    default: FriendRequestStatus.PENDING,
  })
  public status: number;

  @Prop({
    type: Date,
    default: null,
  })
  public respondedAt: Date | null;
}

export const FriendRequestSchema =
  SchemaFactory.createForClass<FriendRequest>(FriendRequest);
