import { BaseRepository } from 'src/core/repositories/base.repository';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';
export declare class PostRepository extends BaseRepository<Post> {
    private readonly postModel;
    constructor(postModel: Model<Post>);
}
