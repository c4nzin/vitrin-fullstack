import { BaseRepository } from 'src/core/repositories/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';

export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {
    super(postModel);
  }
}
