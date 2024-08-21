import { Type } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';
export declare function BaseGuard(type: string): Type<IAuthGuard>;
