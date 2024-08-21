import { AuthService } from '../services';
import { LoginDto, RegisterDto } from '../dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<void>;
    register(registerDto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("../../user/schemas").User> & import("../../user/schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
