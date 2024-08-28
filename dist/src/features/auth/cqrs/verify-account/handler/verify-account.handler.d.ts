import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { VerifyAccountCommand } from '../command/verify-account.command';
import { UserRepository } from 'src/features/user/repositories';
export declare class VerifyAccountCommandHandler implements ICommandHandler<VerifyAccountCommand> {
    private readonly userRepository;
    private readonly commandBus;
    constructor(userRepository: UserRepository, commandBus: CommandBus);
    execute(command: VerifyAccountCommand): Promise<void>;
}
