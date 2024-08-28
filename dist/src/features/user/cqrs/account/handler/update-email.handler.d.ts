import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdatEmailCommand } from '../command/update-email.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
export declare class UpdateEmailCommandHandler implements ICommandHandler<UpdatEmailCommand> {
    private readonly userRepository;
    private readonly commandBus;
    constructor(userRepository: UserRepository, commandBus: CommandBus);
    execute(command: UpdatEmailCommand): Promise<UserDocument>;
}
