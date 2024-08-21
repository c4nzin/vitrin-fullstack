import { AuthService } from '../services';
import { Strategy } from 'passport-local';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("../../user/schemas").User> & import("../../user/schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export {};
