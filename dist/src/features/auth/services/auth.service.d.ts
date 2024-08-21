import { UserRepository } from 'src/features/user/repositories';
import { LoginDto, RegisterDto } from '../dto';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validateUser(username: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("../../user/schemas").User> & import("../../user/schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(loginDto: LoginDto): Promise<void>;
    register(registerDto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("../../user/schemas").User> & import("../../user/schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
