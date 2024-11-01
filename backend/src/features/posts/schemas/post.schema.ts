import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  versionKey: false,
  collection: 'Post',
  timestamps: true,
})
export class Post {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  public author: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  public likes: Types.ObjectId[];

  @Prop({
    minlength: 3,
    maxlength: 255,
    required: true,
  })
  public content: string;

  @Prop({
    type: String,
  })
  public media: string;
}

export const PostSchema = SchemaFactory.createForClass<Post>(Post);
