import { LoginDto } from 'src/features/auth/dto';
export declare class LoginUserCommand {
    readonly user: LoginDto;
    constructor(user: LoginDto);
}
