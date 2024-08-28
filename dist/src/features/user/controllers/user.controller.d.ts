import { UserDocument } from '../schemas';
import { UpdateEmailDto, UpdateProfileDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
export declare class UserController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    getUser(user: UserDocument): Promise<UserDocument>;
    updateProfile(id: string, updateProfile: UpdateProfileDto): Promise<UserDocument>;
    updateEmail(updateEmailDto: UpdateEmailDto, user: UserDocument): Promise<UserDocument>;
}
