import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthenticatedGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}
