import { ICommandHandler } from '@nestjs/cqrs';
import { FetchFollowersCommand } from '../command/fetch-followers.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
export declare class FetchFollowersHandler implements ICommandHandler<FetchFollowersCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: FetchFollowersCommand): Promise<UserDocument[]>;
}
