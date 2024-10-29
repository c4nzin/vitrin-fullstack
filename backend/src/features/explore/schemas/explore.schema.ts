import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExploreDocument = HydratedDocument<Explore>;

@Schema({
  timestamps: true,
  collection: 'Explore',
  autoIndex: true,
})
export class Explore {
  @Prop({
    type: String,
    required: true,
  })
  public userId: string;

  @Prop({
    type: String,
    required: true,
  })
  public postId: string;

  @Prop({
    type: Number,
    default: 0,
  })
  public viewCount: number;
}

export const ExploreSchema = SchemaFactory.createForClass<Explore>(Explore);
