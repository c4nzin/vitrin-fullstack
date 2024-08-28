import { ICommandHandler } from '@nestjs/cqrs';
import { FetchTweetsCommand } from '../command/fetch-tweets.command';
import { PostDocument } from 'src/features/user/schemas';
import { PostRepository, UserRepository } from 'src/features/user/repositories';
export declare class FetchTweetsCommandHandler implements ICommandHandler<FetchTweetsCommand> {
    private readonly postRepository;
    private readonly userRepository;
    constructor(postRepository: PostRepository, userRepository: UserRepository);
    execute(command: FetchTweetsCommand): Promise<PostDocument[]>;
}
