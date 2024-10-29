import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExploreDocument = HydratedDocument<Explore>;

@Schema({
  timestamps: true,
  collection: 'Explore',
  autoIndex: true,
})
export class Explore {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Post',
  })
  public postId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  public userId: Types.ObjectId;

  @Prop({
    type: Number,
    default: 0,
  })
  public viewCount: number;
}

export const ExploreSchema = SchemaFactory.createForClass<Explore>(Explore);
