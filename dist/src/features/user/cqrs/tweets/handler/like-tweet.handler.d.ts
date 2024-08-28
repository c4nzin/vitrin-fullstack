import { ICommandHandler } from '@nestjs/cqrs';
import { LikeTweetCommand } from '../command/like-tweet.command';
import { PostRepository } from 'src/features/user/repositories';
export declare class LikeTweetCommandHandler implements ICommandHandler<LikeTweetCommand> {
    private readonly postRepository;
    constructor(postRepository: PostRepository);
    execute(command: LikeTweetCommand): Promise<any>;
}
