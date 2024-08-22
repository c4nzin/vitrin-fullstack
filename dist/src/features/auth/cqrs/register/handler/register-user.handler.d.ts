import { UserRepository } from 'src/features/user/repositories';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { UserDocument } from 'src/features/user/schemas';
import { RegisterUserCommand } from '../..';
import { Queue } from 'bull';
export declare class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
    private readonly userRepository;
    private readonly commandBus;
    private readonly emailQueue;
    constructor(userRepository: UserRepository, commandBus: CommandBus, emailQueue: Queue);
    execute(command: RegisterUserCommand): Promise<UserDocument>;
}
