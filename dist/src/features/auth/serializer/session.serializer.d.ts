import { PassportSerializer } from '@nestjs/passport';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    serializeUser(user: UserDocument, done: Function): void;
    deserializeUser(userId: string, done: Function): Promise<void>;
}
