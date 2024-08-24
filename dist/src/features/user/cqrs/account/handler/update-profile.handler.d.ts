import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommand } from '../command/update-profile.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
export declare class UpdateProfileFieldsCommandHandler implements ICommandHandler<UpdateProfileFieldsCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: UpdateProfileFieldsCommand): Promise<UserDocument>;
}
