import { LoginDto, RegisterDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserDocument } from 'src/features/user/schemas';
export declare class AuthController {
    private readonly commandbus;
    constructor(commandbus: CommandBus);
    login(loginDto: LoginDto): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
    getme(user: UserDocument): Promise<import("mongoose").Document<unknown, {}, import("src/features/user/schemas").User> & import("src/features/user/schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
