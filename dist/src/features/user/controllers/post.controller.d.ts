import { CommandBus } from '@nestjs/cqrs';
import { PostDocument, UserDocument } from '../schemas';
import { CreatePostDto } from '../dto';
import { DeleteResult } from 'src/core/repositories/types/query.types';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
export declare class PostController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    createPost(user: UserDocument, createPost: CreatePostDto, uploadedMedia?: Express.Multer.File): Promise<PostDocument>;
    deletePost(user: UserDocument, id: string): Promise<DeleteResult<PostDocument>>;
    fetchTweets(id: string, paginate: Pagination): Promise<PostDocument[]>;
    likeTweet(user: UserDocument, id: string): Promise<PostDocument>;
}
