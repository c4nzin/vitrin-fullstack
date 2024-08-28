import { ICommandHandler } from '@nestjs/cqrs';
import { FollowCommand } from '../command/follow.command';
import { UserRepository } from 'src/features/user/repositories';
export declare class FollowCommandHandler implements ICommandHandler<FollowCommand> {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(command: FollowCommand): Promise<void>;
    private checkIfTargetUserValid;
}
