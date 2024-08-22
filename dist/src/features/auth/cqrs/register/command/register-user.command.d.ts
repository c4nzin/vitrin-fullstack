import { RegisterDto } from 'src/features/auth/dto';
export declare class RegisterUserCommand {
    readonly user: RegisterDto;
    constructor(user: RegisterDto);
}
