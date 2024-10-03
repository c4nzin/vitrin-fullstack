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
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  public sender: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  public receiver: Types.ObjectId;

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
