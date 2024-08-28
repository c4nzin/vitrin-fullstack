import { ICommandHandler } from '@nestjs/cqrs';
import { UnfollowCommand } from '../command/unfollow.command';
import { UserRepository } from 'src/features/user/repositories';
export declare class UnfollowCommandHandler implements ICommandHandler<UnfollowCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: UnfollowCommand): Promise<void>;
}
