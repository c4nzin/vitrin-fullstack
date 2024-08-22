import { ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/features/user/repositories';
import { LoginDto } from 'src/features/auth/dto';
import { UserDocument } from 'src/features/user/schemas';
import { LoginUserCommand } from '../..';
export declare class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: LoginUserCommand): Promise<any>;
    validateUser(username: string, password: string): Promise<UserDocument | null>;
    login(loginDto: LoginDto): Promise<void>;
}
