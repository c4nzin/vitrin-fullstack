import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteTweetCommand } from '../command/delete-tweet.command';
import { PostRepository, UserRepository } from 'src/features/user/repositories';
import { PostDocument } from 'src/features/user/schemas';
import { DeleteResult } from 'src/core/repositories/types/query.types';
export declare class DeleteTweetCommandHandler implements ICommandHandler<DeleteTweetCommand> {
    private readonly postRepository;
    private readonly userRepository;
    constructor(postRepository: PostRepository, userRepository: UserRepository);
    execute(command: DeleteTweetCommand): Promise<DeleteResult<PostDocument>>;
}
